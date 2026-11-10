import { defaultLocale, isLocaleId, localeIds, locales, type LocaleId } from './locales';

/** Prefixes a site path with the locale's segment: `/projects/` becomes `/es/projects/`, and
 * `/#contact` becomes `/es/#contact`. English keeps the unprefixed URLs. */
export function localizedPath(locale: LocaleId, path: string): string {
  const prefix = locales[locale].pathPrefix;
  return prefix ? prefix + path : path;
}

/** Splits a pathname into its locale and the path without the locale segment. */
export function splitLocale(pathname: string): { locale: LocaleId; path: string } {
  const [, first = '', ...rest] = pathname.split('/');
  if (first !== defaultLocale && isLocaleId(first))
    return { locale: first, path: '/' + rest.join('/') };
  return { locale: defaultLocale, path: pathname };
}

/** Canonical and hreflang URLs for one page in every language, with English as the default. */
export function languageAlternates(locale: LocaleId, path: string) {
  const languages: Record<string, string> = { 'x-default': path };
  for (const id of localeIds) languages[locales[id].id] = localizedPath(id, path);
  return { canonical: localizedPath(locale, path), languages };
}
