/** Static metadata for one supported language. Message catalogs live separately and load lazily. */
export interface LocaleDefinition {
  /** BCP 47 language tag used in `lang` and `hreflang`. */
  id: string;
  /** The language's name in that language, for the language menu. */
  label: string;
  /** Text direction for `dir`. */
  direction: 'ltr' | 'rtl';
  /** Open Graph locale. */
  openGraphLocale: string;
  /** URL prefix; English keeps the original unprefixed URLs. */
  pathPrefix: string;
}

export const locales = {
  en: { id: 'en', label: 'English', direction: 'ltr', openGraphLocale: 'en_US', pathPrefix: '' },
  es: { id: 'es', label: 'Español', direction: 'ltr', openGraphLocale: 'es_US', pathPrefix: '/es' },
  ar: { id: 'ar', label: 'العربية', direction: 'rtl', openGraphLocale: 'ar_AR', pathPrefix: '/ar' },
  vi: {
    id: 'vi',
    label: 'Tiếng Việt',
    direction: 'ltr',
    openGraphLocale: 'vi_VN',
    pathPrefix: '/vi',
  },
} as const satisfies Record<string, LocaleDefinition>;

export type LocaleId = keyof typeof locales;

export const defaultLocale: LocaleId = 'en';

/** Every supported language, in menu order. */
export const localeIds: readonly LocaleId[] = ['en', 'es', 'ar', 'vi'];

/** Languages served under a URL prefix. */
export const prefixedLocaleIds: readonly LocaleId[] = ['es', 'ar', 'vi'];

export function isLocaleId(value: string): value is LocaleId {
  return Object.hasOwn(locales, value);
}
