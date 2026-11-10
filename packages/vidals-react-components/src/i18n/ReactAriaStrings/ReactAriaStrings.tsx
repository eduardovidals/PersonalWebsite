import { getReactAriaStringsScript } from './script.js';
import type { ReactAriaStringsProps as Props } from './types.js';

/**
 * Gives React Aria its screen-reader strings for a language it does not ship (Vietnamese today)
 * through the same global inline script as React Aria's own `LocalizedStringProvider`. Render it
 * from a Server Component, before any React Aria control, with the locale passed to
 * `I18nProvider`. For every other locale it renders nothing and React Aria keeps its bundled
 * strings.
 * @example
 * ```tsx
 * <html lang="vi">
 *   <head>
 *     <ReactAriaStrings locale="vi" />
 *   </head>
 *   <body>
 *     <I18nProvider locale="vi">{children}</I18nProvider>
 *   </body>
 * </html>
 * ```
 */
export function ReactAriaStrings(props: Props) {
  const { locale, nonce } = props;
  const script = getReactAriaStringsScript(locale);
  if (script === null) return null;

  // Browsers hide a script's nonce once it is parsed, which hydration would report as a mismatch.
  return (
    <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />
  );
}
