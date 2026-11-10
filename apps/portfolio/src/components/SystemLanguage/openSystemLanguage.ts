/**
 * Runs in the browser before the English homepage paints, as an inline script, so it must not
 * reference anything outside its own body. The edge function only sees the browser's language
 * list; Chrome keeps that list from install time, while `Intl` follows the system language.
 * Opens, in order: a translated language the browser ranks above English, then the system
 * language. A language chosen in the header menu always wins, and other pages never move.
 */
export function openSystemLanguage(translated: readonly string[], cookie: string) {
  try {
    if (location.pathname !== '/') return;
    if (document.cookie.split('; ').some((entry) => entry.startsWith(`${cookie}=`))) return;
    const primary = (tag: string) => tag.toLowerCase().split('-')[0] ?? '';
    const preferred = navigator.languages
      .map(primary)
      .find((language) => language === 'en' || translated.includes(language));
    const system = primary(Intl.DateTimeFormat().resolvedOptions().locale);
    const target =
      preferred && preferred !== 'en'
        ? preferred
        : translated.find((language) => language === system);
    if (target) location.replace(`/${target}/${location.search}${location.hash}`);
  } catch {
    // Without cookies or Intl the English homepage stays.
  }
}
