import { VidalsLink } from '@vidals/react-components';
import { profiles } from '@/config/site';
import { signatureMarkId, signaturePath } from '@/components/SignatureIntro';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { LanguageNav } from './components/LanguageNav';
import { MobileMenuNav } from './components/MobileMenuNav';
import { PrimaryNav } from './components/PrimaryNav';
import { primaryLinks } from './links';
import { headerStyles, homeLinkStyles, profileLinkStyles, shellStyles } from './styles';
import type { SiteHeaderProps as Props } from './types';

/**
 * The sticky site header: the handwritten EV home link, the primary navigation, the language
 * menu, profile links on wider screens and the phone menu on narrow ones.
 * @example
 * ```tsx
 * <SiteHeader locale="en" />
 * ```
 */
export async function SiteHeader(props: Props) {
  const { locale } = props;
  const { messages } = await getTranslator(locale);
  const { nav, menu, language, homeLink } = messages.common;
  const links = primaryLinks.map(({ key, href }) => ({
    label: nav[key],
    href: localizedPath(locale, href),
  }));

  return (
    <header className={headerStyles}>
      <div className={shellStyles}>
        <VidalsLink
          variant="plain"
          href={localizedPath(locale, '/')}
          aria-label={homeLink}
          className={homeLinkStyles}
        >
          <span className="pointer-events-none relative block aspect-[37/25] w-13 sm:w-16">
            <svg
              id={signatureMarkId}
              aria-hidden="true"
              focusable="false"
              viewBox="4 10 37 25"
              width="37"
              height="25"
              className="absolute start-0 top-0 block h-full w-full overflow-visible"
            >
              <path
                d={signaturePath}
                pathLength="1"
                strokeDasharray="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </VidalsLink>
        <PrimaryNav label={nav.label} links={links} />
        <div className="flex items-center gap-1 justify-self-end">
          <div className="hidden items-center gap-1 lg:flex">
            {Object.entries(profiles).map(([name, url]) => (
              <VidalsLink key={name} variant="plain" href={url} className={profileLinkStyles}>
                {name} <span aria-hidden="true">↗</span>
              </VidalsLink>
            ))}
          </div>
          <LanguageNav label={language} />
          <MobileMenuNav
            links={links}
            labels={{
              open: menu.open,
              close: menu.close,
              dialog: menu.dialog,
              navigation: menu.navigation,
            }}
          />
        </div>
      </div>
    </header>
  );
}
