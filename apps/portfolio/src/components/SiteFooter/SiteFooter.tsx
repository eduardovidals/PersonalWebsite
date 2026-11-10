import { VidalsLink } from '@vidals/react-components';
import { profiles } from '@/config/site';
import { getTranslator } from '@/i18n/translator';
import { footerStyles, profileLinkStyles } from './styles';
import type { SiteFooterProps as Props } from './types';

/**
 * The closing line on every page: name, title and profile links.
 * @example
 * ```tsx
 * <SiteFooter locale="en" />
 * ```
 */
export async function SiteFooter(props: Props) {
  const { locale } = props;
  const { messages } = await getTranslator(locale);
  const { footer } = messages.common;

  return (
    <footer className={footerStyles}>
      <p className="flex flex-wrap gap-x-3 font-medium text-vidals-muted">
        <span className="text-vidals-text">{footer.name}</span>
        <span>{footer.title}</span>
      </p>
      <nav
        aria-label={footer.label}
        className="flex flex-wrap items-center gap-x-5 text-vidals-muted"
      >
        {Object.entries(profiles).map(([name, url]) => (
          <VidalsLink key={name} variant="plain" href={url} className={profileLinkStyles}>
            {name}
          </VidalsLink>
        ))}
      </nav>
    </footer>
  );
}
