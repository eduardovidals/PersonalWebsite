import type { ReactNode } from 'react';
import type { LocaleId } from '@/i18n/locales';

export interface MarkdownLinkProps {
  /** The Markdown link destination. Site paths are rewritten into the page's language. */
  href?: string;
  /** The link text. */
  children?: ReactNode;
  /** The page's language. */
  locale: LocaleId;
}
