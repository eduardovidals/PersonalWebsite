import { VidalsDisclosure, VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import { Arrow } from '@/components/Arrow';
import { ToolChips } from '@/components/ToolChips';
import { WorkVisual } from '@/components/WorkVisual';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import type { CurrentWorkCardProps as Props } from './types';

// Keep links to the former collection headings working without adding headings to the gallery.
const collectionAliases: Readonly<Record<string, string | undefined>> = {
  'software-factory': 'current-work',
};

/**
 * One piece of current work: title, summary and visual, with its tools and how AI took part
 * behind a disclosure.
 * @example
 * ```tsx
 * <CurrentWorkCard work={softwareFactory} locale="en" />
 * ```
 */
export async function CurrentWorkCard(props: Props) {
  const { work, locale } = props;
  const { messages, format } = await getTranslator(locale);
  const words = messages.projects.work[work.id];
  const notes: Readonly<Record<string, string | undefined>> = words.notes;
  const alias = collectionAliases[work.id];

  return (
    <article
      id={work.id}
      aria-labelledby={`work-${work.id}`}
      className="min-w-0 border-t border-vidals-border/25 pt-5"
    >
      {alias && (
        <span id={alias} aria-hidden="true" className="block">
          <span id={alias + '-heading'} className="block" />
        </span>
      )}
      <h2 id={`work-${work.id}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {work.href ? (
          <VidalsLink
            variant="plain"
            href={localizedPath(locale, work.href)}
            className="inline-flex items-baseline gap-1.5 rounded-sm text-vidals-accent"
          >
            <VidalsLinkLabel>{words.title}</VidalsLinkLabel>
            <Arrow />
          </VidalsLink>
        ) : (
          words.title
        )}
      </h2>
      <p className="mt-2 mb-4 max-w-[58ch] text-base leading-relaxed text-vidals-muted">
        {words.description}
      </p>
      <WorkVisual work={work} locale={locale} />
      <VidalsDisclosure
        trigger={<VidalsLinkLabel>{messages.projects.page.notes}</VidalsLinkLabel>}
        triggerClassName="font-medium"
      >
        <ToolChips
          label={format('toolsUsedOn', { title: words.title })}
          tools={work.stack}
          compact
        />
        {work.ai?.map(({ kind, tools }) => {
          const kindLabel = messages.projects.aiKinds[kind];
          return (
            <div key={kind} className="mt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="text-xs font-medium text-vidals-accent">{kindLabel}</span>
                <ToolChips
                  tools={tools}
                  label={format('aiToolsOn', { kind: kindLabel, title: words.title })}
                  compact
                />
              </div>
              <p className="mt-1.5 max-w-[57ch] text-sm leading-relaxed text-vidals-muted">
                {notes[kind]}
              </p>
            </div>
          );
        })}
      </VidalsDisclosure>
    </article>
  );
}
