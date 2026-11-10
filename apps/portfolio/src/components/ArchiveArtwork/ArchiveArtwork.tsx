import Image from 'next/image';
import { imagePath, mediaDimensions } from '@/content/projects';
import { getTranslator } from '@/i18n/translator';
import type { ArchiveArtworkProps as Props, StillProps } from './types';

function Still(props: StillProps) {
  const { file, alt, eager } = props;
  const [width, height] = mediaDimensions[file];

  return (
    <Image
      src={imagePath(file)}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      unoptimized
      className="block h-auto w-full"
    />
  );
}

/**
 * A project's cover, composed for the width of a card. Shared by the homepage shelf, the projects
 * page and each case study's hero.
 * @example
 * ```tsx
 * <ArchiveArtwork project={project} locale="en" eager />
 * ```
 */
export async function ArchiveArtwork(props: Props) {
  const { project, locale, eager = false } = props;
  const { messages } = await getTranslator(locale);
  const items = messages.projects.items;

  if (project.slug === 'props') {
    return (
      <div className="flex aspect-[16/10] items-center justify-center gap-[7%] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#f0d498,#bc8959)]">
        <div className="w-1/4 translate-y-[3%] overflow-hidden rounded-[11%/5%] shadow-[0_5px_14px_#59361640]">
          <Still file="props-signup" alt={items.props.signupAlt} eager={eager} />
        </div>
        <div className="w-1/4 -translate-y-[3%] overflow-hidden rounded-[11%/5%] shadow-[0_5px_14px_#59361640]">
          <Still file="props-iap" alt={items.props.subscriptionAlt} eager={eager} />
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl bg-vidals-surface">
      <Still
        file={project.preview ?? project.cover}
        alt={items[project.slug].coverAlt}
        eager={eager}
      />
    </div>
  );
}
