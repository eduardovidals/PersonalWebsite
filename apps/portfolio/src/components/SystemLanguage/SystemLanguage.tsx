import { prefixedLocaleIds } from '@/i18n/locales';
import { languageCookie } from '@/i18n/preference';
import { openSystemLanguage } from './openSystemLanguage';

/**
 * Opens the visitor's system language on the English homepage when the edge redirect could not
 * see it. Render it first in the English document so it runs before anything paints.
 * @example
 * ```tsx
 * <body>
 *   <SystemLanguage />
 * </body>
 * ```
 */
export function SystemLanguage() {
  const script = `(${openSystemLanguage.toString()})(${JSON.stringify(prefixedLocaleIds)}, ${JSON.stringify(languageCookie)});`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
