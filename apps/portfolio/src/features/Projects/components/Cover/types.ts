import type { Project } from '@/content/projects';
import type { LocaleId } from '@/i18n/locales';

export interface CoverProps {
  /** The project whose cover to show. */
  project: Project;
  /** The page's language. */
  locale: LocaleId;
  /** On a case study: load eagerly and link the original screenshots. */
  detail?: boolean;
}
