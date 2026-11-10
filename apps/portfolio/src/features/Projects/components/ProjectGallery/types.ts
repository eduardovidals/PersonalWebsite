import type { ReactNode } from 'react';
import type { ProjectKind } from '@/content/projects/kind';

/** A filter choice: every project, or one kind. */
export type GalleryFilter = ProjectKind | 'all';

/** One card in the gallery, already rendered on the server. */
export interface GalleryEntry {
  id: string;
  kind: ProjectKind;
  card: ReactNode;
}

export interface ProjectGalleryProps {
  /** Cards in display order. */
  entries: readonly GalleryEntry[];
  /** The filter's visible label, such as "Show". */
  filterLabel: string;
  /** Each filter choice's words, in menu order. */
  options: readonly { id: GalleryFilter; label: string }[];
  /** The announced result count for each filter, such as "3 projects". */
  counts: Readonly<Record<GalleryFilter, string>>;
}
