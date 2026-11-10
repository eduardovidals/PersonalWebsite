import type { Project as ProjectData } from '@/content/projects';
import type { LocaleId } from '@/i18n/locales';

export interface ProjectProps {
  /** The project this case study describes. */
  project: ProjectData;
  /** The case study in the page's language. */
  markdown: string;
  /** The page's language. */
  locale: LocaleId;
}
