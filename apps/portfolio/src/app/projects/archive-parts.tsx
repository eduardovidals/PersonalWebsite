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
    <div className={`overflow-hidden bg-vidals-deep ${detail ? 'rounded-lg' : 'rounded-t-lg'}`}>
      <Image
        src={imagePath(project.cover)}
        alt={detail ? project.coverAlt : ''}
        width={width}
        height={height}
        unoptimized
        loading={detail ? 'eager' : 'lazy'}
        className={
          detail
            ? 'mx-auto block max-h-[30rem] w-full object-contain'
            : 'aspect-[16/9] w-full object-cover'
        }
      />
    </div>
  );
}
