import type { WorkSnapshot } from '@/content/projects/current-work';
import type { LocaleId } from '@/i18n/locales';

export interface WorkVisualProps {
  /** The work whose visual to show. */
  work: WorkSnapshot;
  /** The page's language, for the alt text and caption. */
  locale: LocaleId;
  /** Hide the caption and full-size links, for thumbnails. */
  compact?: boolean;
}
