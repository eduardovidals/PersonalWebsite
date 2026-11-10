import 'server-only';
import { createInstance } from 'i18next';
import { cache } from 'react';
import { loaders } from './loaders';
import { defaultLocale, locales, type LocaleId } from './locales';
import type { FormatKey, FormatValues, Messages } from './types';

/** A language's catalog plus i18next formatting for its dynamic strings. */
export interface Translator {
  locale: LocaleId;
  messages: Messages;
  /** Interpolates a dynamic string and, given `count`, picks the language's plural form. */
  format: (key: FormatKey, values?: FormatValues) => string;
  /** Formats a month and year, such as "Oct 2021", in the page's language. */
  monthYear: (isoMonth: string) => string;
}

/** Loads one language's catalog at build time. Cached per language for the whole build. */
export const getTranslator = cache(async (locale: LocaleId): Promise<Translator> => {
  const [{ default: messages }, { default: fallback }] = await Promise.all([
    loaders[locale](),
    loaders[defaultLocale](),
  ]);
  const i18n = createInstance();
  await i18n.init({
    lng: locale,
    fallbackLng: defaultLocale,
    ns: ['format'],
    defaultNS: 'format',
    resources: {
      [locale]: { format: messages.format },
      [defaultLocale]: { format: fallback.format },
    },
    interpolation: { escapeValue: false },
  });
  const months = new Intl.DateTimeFormat(locales[locale].id, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return {
    locale,
    messages,
    format: (key, values = {}) => i18n.t(key, values),
    monthYear: (isoMonth) => months.format(new Date(`${isoMonth}-01T00:00:00Z`)),
  };
});
