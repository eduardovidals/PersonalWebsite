import Image from 'next/image';
import { imagePath, mediaDimensions, type Project } from '@/content/projects';

function Still({ file, alt, eager }: { file: string; alt: string; eager: boolean }) {
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

// Shared by the homepage shelf, archive index, case-study hero and related blog notes.
// Compose for the width of a card, which stays narrow even on a two-column desktop grid.
export function ArchiveArtwork({ project, eager = false }: { project: Project; eager?: boolean }) {
  if (project.slug === 'props') {
    return (
      <div className="flex aspect-[16/10] items-center justify-center gap-[7%] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#f0d498,#bc8959)]">
        <div className="w-1/4 translate-y-[3%] overflow-hidden rounded-[11%/5%] shadow-[0_5px_14px_#59361640]">
          <Still file="props-signup" alt="The Props app’s sign-up screen." eager={eager} />
        </div>
        <div className="w-1/4 -translate-y-[3%] overflow-hidden rounded-[11%/5%] shadow-[0_5px_14px_#59361640]">
          <Still file="props-iap" alt="The Props app’s subscription screen." eager={eager} />
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl bg-vidals-surface">
      <Still file={project.preview ?? project.cover} alt={project.coverAlt} eager={eager} />
    </div>
  );
}
