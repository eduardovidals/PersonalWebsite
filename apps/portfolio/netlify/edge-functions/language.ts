/**
 * Sends a first-time visitor on the bare homepage to their language. Deep links keep the language
 * they were shared in, and search engines, which arrive without a language preference from the
 * United States, get the English `x-default` page.
 *
 * Order: a language the visitor chose in the header menu, then a translated language their system
 * prefers over English, then their country. Everyone else stays on English.
 */

/** Netlify's edge context, narrowed to what this function reads. */
interface EdgeContext {
  geo: { country?: { code?: string } };
}

type Translated = 'es' | 'ar' | 'vi';
type Language = 'en' | Translated;

/** Written by the header's language menu (`src/i18n/preference.ts`). */
const choiceCookie = 'language';

const languages: readonly Language[] = ['en', 'es', 'ar', 'vi'];

/** Countries where most people read one of the translations, by ISO 3166 code. */
const countryLanguages: Readonly<Record<string, Translated>> = {
  VN: 'vi',
  ...Object.fromEntries(
    ['AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GQ', 'GT', 'HN', 'MX', 'NI', 'PA']
      .concat(['PE', 'PR', 'PY', 'SV', 'UY', 'VE'])
      .map((code) => [code, 'es']),
  ),
  ...Object.fromEntries(
    ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'MR', 'OM', 'PS', 'QA', 'SA']
      .concat(['SD', 'SY', 'TN', 'YE'])
      .map((code) => [code, 'ar']),
  ),
};

function isLanguage(value: string | undefined): value is Language {
  return languages.some((language) => language === value);
}

/** The visitor's saved choice from the header menu. */
function chosenLanguage(cookieHeader: string | null) {
  const value = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim().split('='))
    .find(([name]) => name === choiceCookie)?.[1];
  return isLanguage(value) ? value : undefined;
}

/** The supported language the browser ranks highest in `Accept-Language`, such as `vi` for `vi-VN`. */
function systemLanguage(acceptLanguage: string | null) {
  const ranked = (acceptLanguage ?? '')
    .split(',')
    .map((entry, order) => {
      const [tag = '', ...parameters] = entry.trim().split(';');
      const weight = parameters
        .map((parameter) => parameter.trim())
        .find((p) => p.startsWith('q='));
      const quality = weight ? Number(weight.slice(2)) : 1;
      return { language: tag.split('-')[0]?.toLowerCase(), quality, order };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.order - b.order);
  return ranked.map((entry) => entry.language).find(isLanguage);
}

export default function redirectToLanguage(request: Request, context: EdgeContext) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;

  const system = systemLanguage(request.headers.get('accept-language'));
  const language =
    chosenLanguage(request.headers.get('cookie')) ??
    (system && system !== 'en' ? system : undefined) ??
    countryLanguages[context.geo.country?.code ?? ''] ??
    'en';
  if (language === 'en') return;

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/${language}/${new URL(request.url).search}`,
      'Cache-Control': 'no-store',
      Vary: 'Accept-Language, Cookie',
    },
  });
}

export const config = { path: '/' };
