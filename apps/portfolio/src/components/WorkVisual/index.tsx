import Image from 'next/image';
import type { WorkSnapshot } from '@/content/projects/current-work';

/** Private projects use artwork, never a reconstruction of the internal interface. */
export function WorkVisual({
  work,
  compact = false,
}: Readonly<{ work: WorkSnapshot; compact?: boolean }>) {
  const { id, visual } = work;
  if (visual.kind === 'planned') return null;
  const illustration = visual.kind === 'illustration';
  const [width, height] = illustration ? [800, 480] : visual.wide;
  const base = '/work/current/' + id;
  return (
    <figure>
      <div className="overflow-hidden rounded-xl bg-vidals-surface">
        <picture className="block">
          {!illustration && (
            <source
              media="(max-width: 1023px)"
              srcSet={base + '-detail.webp'}
              width={visual.detail[0]}
              height={visual.detail[1]}
            />
          )}
          <Image
            alt={visual.alt}
            src={base + (illustration ? '.svg' : '-wide.webp')}
            width={width}
            height={height}
            sizes="(max-width: 639px) 94vw, (max-width: 1199px) 46vw, 560px"
            unoptimized
            className="block h-auto w-full"
          />
        </picture>
      </div>
      <figcaption
        className={
          compact
            ? 'sr-only'
            : 'mt-2 flex flex-wrap items-center justify-between gap-x-3 text-xs leading-relaxed text-vidals-muted'
        }
      >
        {visual.caption}
        {!compact && !illustration && (
          <>
            <a
              href={base + '-small.webp'}
              aria-label={'Full phone screenshot of ' + work.title}
              className="inline-flex min-h-11 items-center text-vidals-accent underline underline-offset-4 lg:hidden"
            >
              Full screenshot
            </a>
            <a
              href={base + '-wide.webp'}
              aria-label={'Full desktop screenshot of ' + work.title}
              className="hidden min-h-11 items-center text-vidals-accent underline underline-offset-4 lg:inline-flex"
            >
              Full screenshot
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
