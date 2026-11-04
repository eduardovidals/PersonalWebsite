import Image from 'next/image';
import { imagePath, mediaDimensions } from '@/content/projects';
import type { Project } from '@/content/projects';

export function IndexLabel({ number, children }: { number?: number; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-xs font-medium tracking-[.09em] uppercase">
      {number !== undefined && (
        <span className="text-accent">{String(number).padStart(2, '0')}</span>
      )}
      {children}
    </span>
  );
}

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
    <div className={`overflow-hidden border border-line ${detail ? 'bg-paper' : 'bg-white'}`}>
      <Image
        src={imagePath(project.cover)}
        alt={detail ? project.coverAlt : ''}
        width={width}
        height={height}
        unoptimized
        loading={detail ? 'eager' : 'lazy'}
        className={
          detail
            ? 'mx-auto block max-h-[35rem] w-full object-contain'
            : 'aspect-[16/9] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]'
        }
      />
    </div>
  );
}
