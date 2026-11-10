import type { LocaleId } from './locales';

/**
 * Cookie that holds a language the visitor chose in the header menu. The homepage edge function
 * (`netlify/edge-functions/language.ts`) and `SystemLanguage` read it before guessing.
 */
export const languageCookie = 'language';

/**
 * Remembers a language the visitor chose, so the homepage opens it next time instead of guessing
 * from their system language or country. It holds only the language code and lasts a year.
 */
export function rememberLanguage(locale: LocaleId) {
  document.cookie = `${languageCookie}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
