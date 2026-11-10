import type { WorkSnapshot } from '@/content/projects/current-work';
import type { LocaleId } from '@/i18n/locales';

export interface CurrentWorkCardProps {
  work: WorkSnapshot;
  /** The page's language. */
  locale: LocaleId;
}
