import { ArchiveArtwork } from '@/components/ArchiveArtwork';
import { projects, type Project } from '@/content/projects';

// Only pair a note with imagery from the actual project discussed in it.
const relatedProjects: Readonly<Record<string, string>> = {
  'the-search-is-not-the-path': 'pathfinding-visualizer',
  'what-a-sorted-array-hides': 'sorting-visualizer',
};

export function artworkForPost(slug: string) {
  return projects.find((project) => project.slug === relatedProjects[slug]);
}

export function PostArtwork({ project, small = false }: { project: Project; small?: boolean }) {
  return <ArchiveArtwork project={project} eager={!small} />;
}
