import { ArchiveArtwork } from '@/components/ArchiveArtwork';
import { imagePath } from '@/content/projects';
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
  if (!detail) return <ArchiveArtwork project={project} />;
  const originals = [
    [project.cover, project.smallCover ? 'Desktop screenshot' : 'Original screenshot'],
    ...(project.smallCover ? [[project.smallCover, 'Phone screenshot']] : []),
  ];
  return (
    <>
      <div className="mx-auto max-w-3xl">
        <ArchiveArtwork project={project} eager />
      </div>
      <figcaption className="mx-auto mt-2 flex max-w-3xl flex-wrap items-center gap-x-3 text-sm leading-snug">
        <span className="text-vidals-muted">View full size:</span>
        {originals.map(([file, label]) => (
          <a
            key={file}
            href={imagePath(file)}
            className="inline-flex min-h-11 items-center text-vidals-accent underline underline-offset-4 hover:decoration-2"
          >
            {label}
          </a>
        ))}
      </figcaption>
    </>
  );
}
