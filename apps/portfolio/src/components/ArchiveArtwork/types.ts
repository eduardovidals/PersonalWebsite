import type { Project } from '@/content/projects';
import type { LocaleId } from '@/i18n/locales';

export interface ArchiveArtworkProps {
  /** The project whose cover to show. */
  project: Project;
  /** The page's language, for the alt text. */
  locale: LocaleId;
  /** Load immediately, for artwork above the fold. */
  eager?: boolean;
}

export interface StillProps {
  /** Media name from the project catalog. */
  file: string;
  /** Describes the screenshot. */
  alt: string;
  /** Load immediately instead of lazily. */
  eager: boolean;
}
