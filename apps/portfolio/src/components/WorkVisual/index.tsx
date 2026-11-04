import Image from 'next/image';
import type { WorkSnapshot } from '@/content/projects/current-work';

/** Private projects use artwork, never a reconstruction of the internal interface. */
export function WorkVisual({
  work,
  compact = false,
}: Readonly<{ work: WorkSnapshot; compact?: boolean }>) {
  const { id, visual } = work;
  const illustration = visual.kind === 'illustration';
  const base = '/work/current/' + id;
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl bg-vidals-surface ring-1 ring-inset ring-vidals-border/20">
        <picture>
          {!illustration && <source media="(max-width: 639px)" srcSet={base + '-small.webp'} />}
          <Image
            alt={visual.alt}
            src={base + (illustration ? '.svg' : '-wide.webp')}
            width={800}
            height={480}
            sizes="(max-width: 639px) 94vw, (max-width: 1199px) 46vw, 560px"
            unoptimized
            className={
              compact
                ? 'block aspect-square w-full object-cover'
                : illustration || id === 'anniversary'
                  ? 'block aspect-[4/3] w-full object-cover sm:aspect-[16/9]'
                  : 'block aspect-square w-full object-cover object-top sm:aspect-[16/9] sm:object-contain'
            }
          />
        </picture>
      </div>
      <figcaption
        className={compact ? 'sr-only' : 'mt-2 text-xs leading-relaxed text-vidals-muted'}
      >
        {visual.caption}
      </figcaption>
    </figure>
  );
}
