import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import type { NotFoundProps as Props } from './types';

/**
 * The missing-page message with a way back to every project.
 * @example
 * ```tsx
 * <NotFound locale="en" />
 * ```
 */
export async function NotFound(props: Props) {
  const { locale } = props;
  const { messages } = await getTranslator(locale);
  const copy = messages.common.notFound;

  return (
    <section className="shell py-20 text-center text-vidals-text sm:py-28">
      <p
        aria-hidden="true"
        className="inline-block rounded-full bg-vidals-surface px-4 py-1.5 text-sm font-semibold text-vidals-accent"
      >
        404
      </p>
      <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
        {copy.title}
      </h1>
      <p className="mt-3 mb-6 text-lg text-vidals-muted">{copy.body}</p>
      <VidalsLink
        variant="plain"
        href={localizedPath(locale, '/projects/')}
        className="inline-flex min-h-11 items-center font-semibold text-vidals-accent"
      >
        <VidalsLinkLabel>{copy.link}</VidalsLinkLabel>
      </VidalsLink>
    </section>
  );
}
