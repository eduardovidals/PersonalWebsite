import Image from 'next/image';
import Link from 'next/link';
import {
  imagePath,
  mediaDimensions,
  projectHref,
  projects,
  type Project,
} from '@/content/projects';
import { Arrow } from '../Arrow/Arrow';
import { PathPlate } from '../PathPlate/PathPlate';

const featuredSlugs = new Set(['props', 'sorting-visualizer']);
const caption = 'text-xs font-bold uppercase tracking-[.1em]';

function Screenshot({
  file,
  alt,
  sizes,
  className,
}: {
  file: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  const [width, height] = mediaDimensions[file];
  return (
    <Image
      src={imagePath(file)}
      width={width}
      height={height}
      alt={alt}
      sizes={sizes}
      className={className}
    />
  );
}

function Feature({ project }: { project: Project }) {
  const isMobileApp = project.slug === 'props';
  return (
    <article className={`min-w-0 ${isMobileApp ? '' : 'md:pt-12'}`}>
      <Link
        href={projectHref(project.slug)}
        aria-labelledby={`home-project-${project.slug}`}
        className="group block"
      >
        {isMobileApp ? (
          <div className="relative isolate aspect-[16/10] overflow-hidden border border-vidals-text/30 bg-vidals-poster">
            <Screenshot
              file="props-signup"
              alt="The sign-up screen I worked on for Props."
              sizes="(min-width: 48rem) 17vw, 32vw"
              className="absolute top-[9%] left-[14%] w-[32%] -rotate-[6deg] border border-vidals-text/55 shadow-[3px_4px_0_#292620]"
            />
            <Screenshot
              file="props-iap"
              alt="The Props app’s subscription screen."
              sizes="(min-width: 48rem) 19vw, 36vw"
              className="absolute top-[20%] left-[49%] w-[36%] rotate-[5deg] border border-vidals-text/55 shadow-[3px_4px_0_#292620]"
            />
          </div>
        ) : (
          <div className="flex aspect-[7/5] items-center justify-center border border-vidals-text/30 bg-vidals-print p-[7%]">
            <Screenshot
              file={project.cover}
              alt={project.coverAlt}
              sizes="(min-width: 48rem) 34vw, 84vw"
              className="h-auto w-full border border-vidals-text shadow-[4px_4px_0_#292620]"
            />
          </div>
        )}
        <div className="mt-4 flex items-center justify-between gap-x-3 border-b border-vidals-text/40 pb-2">
          <p className={caption}>{project.context}</p>
          <span className="text-xs text-vidals-muted">
            {isMobileApp ? 'Mobile + web' : 'React + TypeScript'}
          </span>
        </div>
        <h3
          id={`home-project-${project.slug}`}
          className="mt-3 flex items-center justify-between gap-2 text-[clamp(2rem,4.25vw,3.8rem)] leading-none font-black tracking-[-.045em] group-hover:text-vidals-accent"
        >
          {project.title}
          <Arrow direction="up-right" className="text-2xl text-vidals-accent" />
        </h3>
        <p className="mt-3 max-w-[53ch] leading-relaxed text-vidals-muted">{project.description}</p>
      </Link>
    </article>
  );
}

export function ProjectShelf() {
  return (
    <>
      <div className="grid items-start gap-9 md:grid-cols-[1.35fr_1fr] md:gap-12">
        {projects
          .filter(({ slug }) => featuredSlugs.has(slug))
          .map((project) => (
            <Feature key={project.slug} project={project} />
          ))}
      </div>
      <div className="mt-12 border-t-2 border-vidals-text sm:mt-16">
        {projects
          .filter(({ slug }) => !featuredSlugs.has(slug))
          .map((project) => (
            <article key={project.slug} className="border-b border-vidals-text/55">
              <Link
                href={projectHref(project.slug)}
                aria-labelledby={`home-project-${project.slug}`}
                className="group grid grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-x-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)_minmax(12rem,.85fr)_auto] sm:gap-x-6"
              >
                <Screenshot
                  file={project.cover}
                  alt={project.coverAlt}
                  sizes="(min-width: 40rem) 112px, 64px"
                  className="aspect-[1.65] w-full border border-vidals-text/30 object-cover"
                />
                <div className="min-w-0">
                  <p className="mb-1 text-xs text-vidals-muted">{project.context}</p>
                  <h3
                    id={`home-project-${project.slug}`}
                    className="text-[clamp(1.25rem,2.7vw,2.1rem)] leading-tight font-bold tracking-[-.05em] group-hover:text-vidals-accent"
                  >
                    {project.title}
                  </h3>
                </div>
                <p className="col-span-3 mt-2 text-sm leading-relaxed text-vidals-muted sm:col-span-1 sm:mt-0">
                  {project.description}
                </p>
                <Arrow
                  direction="up-right"
                  className="col-start-3 row-start-1 text-lg text-vidals-accent sm:col-auto sm:row-auto"
                />
              </Link>
              {project.slug === 'pathfinding-visualizer' && (
                <details className="mb-3 sm:ml-[8.5rem]">
                  <summary className="w-fit max-w-full cursor-pointer py-2 text-sm font-bold text-vidals-accent underline decoration-1 underline-offset-4 hover:decoration-2">
                    Try the pathfinding demo
                  </summary>
                  <PathPlate />
                </details>
              )}
            </article>
          ))}
      </div>
    </>
  );
}
