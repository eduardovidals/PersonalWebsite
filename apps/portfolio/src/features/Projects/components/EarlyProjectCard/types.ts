import type { Project } from '@/content/projects';
import type { LocaleId } from '@/i18n/locales';

export interface EarlyProjectCardProps {
  project: Project;
  /** The page's language. */
  locale: LocaleId;
}
