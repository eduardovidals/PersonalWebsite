import Image from 'next/image';
import Link from 'next/link';
import { imagePath, mediaDimensions, projectHref, projects } from '@/content/projects';
import { Arrow } from '../Arrow/Arrow';
import { PathPlate } from '../PathPlate/PathPlate';

export function ProjectShelf() {
  return (
    <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const cover = project.slug === 'props' ? 'props-website' : project.cover;
        const alt = project.slug === 'props' ? 'The Props subscription website.' : project.coverAlt;
        const [width, height] = mediaDimensions[cover];
        return (
          <article
            key={project.slug}
            className="min-w-0 rounded-xl border border-vidals-border bg-vidals-background"
          >
            <Link
              href={projectHref(project.slug)}
              aria-labelledby={`home-project-${project.slug}`}
              className="group block rounded-xl"
            >
              <Image
                src={imagePath(cover)}
                width={width}
                height={height}
                sizes="(min-width: 64rem) 32vw, (min-width: 40rem) 48vw, 95vw"
                alt={alt}
                className="aspect-video w-full rounded-t-xl border-b border-vidals-border bg-vidals-surface object-contain"
              />
              <div className="p-5">
                <h3
                  id={`home-project-${project.slug}`}
                  className="flex items-center justify-between gap-2 text-xl font-semibold tracking-tight group-hover:text-vidals-accent"
                >
                  {project.title}
                  <Arrow className="text-vidals-accent" />
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-vidals-muted">
                  {project.description}
                </p>
              </div>
            </Link>
            {project.slug === 'pathfinding-visualizer' && (
              <details className="border-t border-vidals-border">
                <summary className="cursor-pointer rounded-b-xl px-5 py-3 text-sm font-semibold text-vidals-accent hover:underline">
                  Try the pathfinding demo
                </summary>
                <PathPlate />
              </details>
            )}
          </article>
        );
      })}
    </div>
  );
}
