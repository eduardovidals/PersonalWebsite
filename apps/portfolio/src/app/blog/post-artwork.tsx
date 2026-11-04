import Image from 'next/image';
import { imagePath, mediaDimensions, projects, type Project } from '@/content/projects';

// Only pair a note with imagery from the actual project discussed in it.
const relatedProjects: Readonly<Record<string, string>> = {
  'the-search-is-not-the-path': 'pathfinding-visualizer',
  'what-a-sorted-array-hides': 'sorting-visualizer',
};

export function artworkForPost(slug: string) {
  return projects.find((project) => project.slug === relatedProjects[slug]);
}

export function PostArtwork({ project, small = false }: { project: Project; small?: boolean }) {
  const [width, height] = mediaDimensions[project.cover];
  return (
    <div
      className={
        small
          ? 'overflow-hidden rounded-xl bg-vidals-surface'
          : 'overflow-hidden rounded-2xl bg-vidals-surface'
      }
    >
      <Image
        src={imagePath(project.cover)}
        alt={project.coverAlt}
        width={width}
        height={height}
        unoptimized
        className={
          small ? 'aspect-[3/2] w-full object-cover' : 'aspect-[16/10] w-full object-cover'
        }
      />
    </div>
  );
}
