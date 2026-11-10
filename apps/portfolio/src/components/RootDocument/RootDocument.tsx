import { VidalsBackToTop, VidalsLink, VidalsPressRipple } from '@vidals/react-components';
import { ReactAriaStrings } from '@vidals/react-components/i18n';
import { AppProviders } from '@/components/AppProviders';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SystemLanguage } from '@/components/SystemLanguage';
import { locales } from '@/i18n/locales';
import { getTranslator } from '@/i18n/translator';
import { skipLinkStyles } from './styles';
import type { RootDocumentProps as Props } from './types';

/**
 * The document shell shared by every language's root layout: `lang` and `dir` on `<html>`,
 * the English homepage's system-language check, React Aria strings for languages it does not
 * ship, the skip link, header, footer, back-to-top control and press ripple.
 * @example
 * ```tsx
 * <RootDocument locale="es">{children}</RootDocument>
 * ```
 */
export async function RootDocument(props: Props) {
  const { locale, children } = props;
  const { messages } = await getTranslator(locale);
  const { id, direction } = locales[locale];

  return (
    <html lang={id} dir={direction}>
      <body className="antialiased">
        {/* First in the body, so a redirect happens before anything paints. */}
        {locale === 'en' && <SystemLanguage />}
        {/* Runs before hydration, so React Aria reads the strings on its first render. */}
        <ReactAriaStrings locale={id} />
        <AppProviders locale={id}>
          <VidalsLink variant="plain" href="#main-content" className={skipLinkStyles}>
            {messages.common.skipToContent}
          </VidalsLink>
          <SiteHeader locale={locale} />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter locale={locale} />
          <VidalsBackToTop label={messages.common.backToTop} focusTargetId="main-content" />
          <VidalsPressRipple />
        </AppProviders>
      </body>
    </html>
  );
}
