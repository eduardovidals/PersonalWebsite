import type { LocaleId } from './locales';

/**
 * Remembers a language the visitor chose, so the homepage edge function
 * (`netlify/edge-functions/language.ts`) opens it next time instead of guessing from their
 * system language or country. It holds only the language code and lasts a year.
 */
export function rememberLanguage(locale: LocaleId) {
  document.cookie = `language=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
