import Image from 'next/image';
import { imagePath, mediaDimensions } from '@/content/projects';
import type { Project } from '@/content/projects';

export function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={back ? 'size-[1.15em] rotate-180' : 'size-[1.15em]'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

export function Cover({ project, detail = false }: { project: Project; detail?: boolean }) {
  const [width, height] = mediaDimensions[project.cover];
  return (
    <div className="overflow-hidden rounded-2xl bg-vidals-surface">
      <picture>
        {project.smallCover && (
          <source media="(max-width: 639px)" srcSet={imagePath(project.smallCover)} />
        )}
        <Image
          src={imagePath(project.cover)}
          alt={project.coverAlt}
          width={width}
          height={height}
          unoptimized
          loading={detail ? 'eager' : 'lazy'}
          className={
            detail
              ? 'mx-auto block max-h-[37rem] w-full object-contain'
              : 'aspect-[4/3] w-full object-cover sm:aspect-[16/10]'
          }
        />
      </picture>
    </div>
  );
}
