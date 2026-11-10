import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import { ArchiveArtwork } from '@/components/ArchiveArtwork';
import { imagePath } from '@/content/projects';
import { getTranslator } from '@/i18n/translator';
import type { CoverProps as Props } from './types';

/**
 * A project's cover: card artwork in lists, and on a case study the artwork with links to the
 * original screenshots at full size.
 * @example
 * ```tsx
 * <Cover project={project} locale="en" detail />
 * ```
 */
export async function Cover(props: Props) {
  const { project, locale, detail = false } = props;
  if (!detail) return <ArchiveArtwork project={project} locale={locale} />;

  const { messages } = await getTranslator(locale);
  const words = messages.projects.detail;
  const originals = [
    {
      file: project.cover,
      label: project.smallCover ? words.desktopScreenshot : words.originalScreenshot,
    },
    ...(project.smallCover ? [{ file: project.smallCover, label: words.phoneScreenshot }] : []),
  ];

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <ArchiveArtwork project={project} locale={locale} eager />
      </div>
      <figcaption className="mx-auto mt-2 flex max-w-3xl flex-wrap items-center gap-x-3 text-sm leading-snug">
        <span className="text-vidals-muted">{words.viewFullSize}</span>
        {originals.map(({ file, label }) => (
          <VidalsLink
            key={file}
            variant="plain"
            href={imagePath(file)}
            className="inline-flex min-h-11 items-center text-vidals-accent"
          >
            <VidalsLinkLabel>{label}</VidalsLinkLabel>
          </VidalsLink>
        ))}
      </figcaption>
    </>
  );
}
