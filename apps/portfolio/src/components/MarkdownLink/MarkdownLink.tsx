import { VidalsLink } from '@vidals/react-components';
import { localizedPath } from '@/i18n/paths';
import type { MarkdownLinkProps as Props } from './types';

/**
 * Renders a Markdown link as a React Aria inline link. Stories link to English site paths, which
 * this rewrites into the page's language; other URLs stay as written.
 * @example
 * ```tsx
 * <Markdown components={{ a: (link) => <MarkdownLink {...link} locale="es" /> }}>{story}</Markdown>
 * ```
 */
export function MarkdownLink(props: Props) {
  const { href, children, locale } = props;
  const destination = href?.startsWith('/') ? localizedPath(locale, href) : href;

  return <VidalsLink href={destination}>{children}</VidalsLink>;
}
