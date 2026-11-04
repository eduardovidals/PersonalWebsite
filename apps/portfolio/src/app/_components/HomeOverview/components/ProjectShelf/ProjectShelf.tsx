import Image from 'next/image';
import Link from 'next/link';
import { ToolChips } from '@/components/ToolChips';
import {
  imagePath,
  mediaDimensions,
  projectHref,
  projects,
  type Project,
} from '@/content/projects';
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

function Screenshot({
  file,
  alt,
  className,
  sizes,
}: {
  file: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  const [width, height] = mediaDimensions[file];
  return (
    <Image
      src={imagePath(file)}
      width={width}
      height={height}
      alt={alt}
      className={className}
      sizes={sizes}
    />
  );
}

function Preview({ project }: { project: Project }) {
  const sizes = '(min-width: 72rem) 530px, (min-width: 40rem) 47vw, 94vw';
  if (project.slug === 'props') {
    return (
      <div className="relative flex aspect-[16/10] items-center justify-center gap-[5%] overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top_left,#e9c682,#b87c49)] sm:rounded-[2rem]">
        <Screenshot
          file="props-signup"
          alt="The sign-up screen I worked on for Props."
          sizes="(min-width: 40rem) 13vw, 24vw"
          className="mt-[10%] w-[28%] rounded-[1.2rem] shadow-[0_12px_30px_#59361645] sm:rounded-[1.6rem]"
        />
        <Screenshot
          file="props-iap"
          alt="The Props app’s subscription screen."
          sizes="(min-width: 40rem) 13vw, 24vw"
          className="-mt-[10%] w-[28%] rounded-[1.2rem] shadow-[0_12px_30px_#59361645] sm:rounded-[1.6rem]"
        />
      </div>
    );
  }
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-vidals-surface sm:rounded-[2rem]">
      <Screenshot
        file={project.cover}
        alt={project.coverAlt}
        sizes={sizes}
        className="size-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025]"
      />
    </div>
  );
}

export function ProjectShelf() {
  const gallery = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  return (
    <div className="grid items-start gap-x-7 gap-y-10 sm:grid-cols-2 md:gap-x-9 md:gap-y-12">
      {gallery.map((project) => (
        <article key={project.slug} className="min-w-0">
          <Link
            href={projectHref(project.slug)}
            aria-labelledby={`home-project-${project.slug}`}
            className="group block rounded-3xl"
          >
            <Preview project={project} />
            <div className="mt-4 px-1 sm:mt-5">
              <p className="text-sm font-medium text-vidals-accent">{project.context}</p>
              <h3
                id={`home-project-${project.slug}`}
                className="mt-1 flex items-center gap-2 text-[clamp(1.5rem,2.7vw,2.1rem)] leading-tight font-semibold tracking-[-.04em] group-hover:text-vidals-accent"
              >
                {project.title}
                <Arrow direction="up-right" className="text-base text-vidals-muted" />
              </h3>
              <p className="mt-1.5 max-w-[50ch] text-[15px] leading-relaxed text-vidals-muted">
                {project.description}
              </p>
            </div>
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
