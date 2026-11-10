import type { LocaleId } from '@/i18n/locales';

export interface ArticleBodyProps {
  /** The case study's Markdown. */
  markdown: string;
  /** The page's language, for link URLs and labels. */
  locale: LocaleId;
}
