import Link from 'next/link';
import { ArchiveArtwork } from '@/components/ArchiveArtwork';
import { ToolChips } from '@/components/ToolChips';
import { projectHref, projects } from '@/content/projects';
import { Arrow } from '../Arrow/Arrow';
import { PathPlate } from '../PathPlate/PathPlate';

const order = [
  'solar-system',
  'props',
  'pathfinding-visualizer',
  'benev',
  '3d-sorting-visualizer',
  'sorting-visualizer',
];

export function ProjectShelf() {
  const gallery = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  return (
    <div className="grid items-start gap-x-7 gap-y-12 sm:grid-cols-2 md:gap-x-9">
      {gallery.map((project) => (
        <article key={project.slug} className="min-w-0">
          <Link
            href={projectHref(project.slug)}
            aria-labelledby={`home-project-${project.slug}`}
            className="group block rounded-3xl"
          >
            <div className="mb-3 px-1">
              <p className="text-sm font-medium text-vidals-accent">{project.context}</p>
              <h3
                id={`home-project-${project.slug}`}
                className="mt-1 flex items-center gap-2 text-[clamp(1.5rem,2.7vw,2.1rem)] leading-tight font-semibold tracking-[-.04em] group-hover:text-vidals-accent"
              >
                {project.title}
                <Arrow direction="up-right" className="text-base text-vidals-muted" />
              </h3>
            </div>
            <ArchiveArtwork project={project} />
            <p className="mt-3 max-w-[50ch] px-1 text-[15px] leading-relaxed text-vidals-muted">
              {project.description}
            </p>
          </Link>
          <div className="mt-3 px-1">
            <ToolChips tools={project.stack} label={`Tools used on ${project.title}`} compact />
          </div>
          {project.slug === 'pathfinding-visualizer' && (
            <details className="mt-2 px-1">
              <summary className="w-fit max-w-full cursor-pointer rounded-full px-3 py-2.5 text-sm font-medium text-vidals-accent hover:bg-vidals-surface">
                Try the pathfinding demo
              </summary>
              <PathPlate />
            </details>
          )}
        </article>
      ))}
    </div>
  );
}
