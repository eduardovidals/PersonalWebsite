import type { LocaleId } from '@/i18n/locales';

export interface VeltonProps {
  /** The founder story in the page's language. */
  story: string;
  /** The page's language. */
  locale: LocaleId;
}
