import type { LocaleId } from '@/i18n/locales';

export interface SiteHeaderProps {
  /** The page's language. */
  locale: LocaleId;
}

/** A header link with its words and language-specific URL already resolved. */
export interface HeaderLink {
  label: string;
  href: string;
}
