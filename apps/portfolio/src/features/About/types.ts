import type { LocaleId } from '@/i18n/locales';

export interface AboutProps {
  /** The career story in the page's language. */
  story: string;
  /** The page's language. */
  locale: LocaleId;
}
