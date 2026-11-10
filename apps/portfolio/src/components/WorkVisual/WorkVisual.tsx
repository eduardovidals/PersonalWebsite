import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import Image from 'next/image';
import { getTranslator } from '@/i18n/translator';
import { captionStyles, fullSizeLinkStyles } from './styles';
import type { WorkVisualProps as Props } from './types';

/**
 * A screenshot or artwork for one piece of work. Private projects use artwork, never a
 * reconstruction of the internal interface.
 * @example
 * ```tsx
 * <WorkVisual work={softwareFactory} locale="en" compact />
 * ```
 */
export async function WorkVisual(props: Props) {
  const { work, locale, compact = false } = props;
  const { messages, format } = await getTranslator(locale);
  const { id, visual } = work;
  const words = messages.projects.work[id];
  const fullScreenshot = messages.projects.detail.fullScreenshot;
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
            alt={words.alt}
            src={base + (illustration ? '.svg' : '-wide.webp')}
            width={width}
            height={height}
            sizes="(max-width: 639px) 94vw, (max-width: 1199px) 46vw, 560px"
            unoptimized
            className="block h-auto w-full"
          />
        </picture>
      </div>
      <figcaption className={compact ? 'sr-only' : captionStyles}>
        {words.caption}
        {!compact && !illustration && (
          <>
            <VidalsLink
              variant="plain"
              href={base + '-small.webp'}
              aria-label={format('fullPhoneScreenshot', { title: words.title })}
              className={fullSizeLinkStyles.phone}
            >
              <VidalsLinkLabel>{fullScreenshot}</VidalsLinkLabel>
            </VidalsLink>
            <VidalsLink
              variant="plain"
              href={base + '-wide.webp'}
              aria-label={format('fullDesktopScreenshot', { title: words.title })}
              className={fullSizeLinkStyles.desktop}
            >
              <VidalsLinkLabel>{fullScreenshot}</VidalsLinkLabel>
            </VidalsLink>
          </>
        )}
      </figcaption>
    </figure>
  );
}
