import { VidalsLink } from '@vidals/react-components';
import { Arrow } from '@/components/Arrow';
import { ToolChips } from '@/components/ToolChips';
import { projectHref } from '@/content/projects';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { Cover } from '../Cover';
import type { EarlyProjectCardProps as Props } from './types';

/**
 * One early project on the projects page: a card that opens its case study, then its stack.
 * @example
 * ```tsx
 * <EarlyProjectCard project={project} locale="en" />
 * ```
 */
export async function EarlyProjectCard(props: Props) {
  const { project, locale } = props;
  const { messages, format } = await getTranslator(locale);
  const words = messages.projects.items[project.slug];
  const headingId = `project-${project.slug}`;

  return (
    <article id={project.slug} aria-labelledby={headingId} className="min-w-0">
      <VidalsLink
        variant="plain"
        id={project.slug === 'props' ? 'early-work' : undefined}
        href={localizedPath(locale, projectHref(project.slug))}
        aria-labelledby={headingId}
        className="group flex flex-col gap-3 rounded-2xl"
      >
        <div>
          <h2
            id={headingId}
            className="flex items-center gap-3 text-2xl font-semibold tracking-tight group-hover:text-vidals-accent sm:text-3xl"
          >
            {words.title} <Arrow className="text-base text-vidals-accent" />
          </h2>
          <p className="mt-1 text-sm font-medium text-vidals-accent">{words.context}</p>
          <p className="mt-2 max-w-[48ch] leading-relaxed text-vidals-muted">{words.caption}</p>
        </div>
        <Cover project={project} locale={locale} />
      </VidalsLink>
      <div className="mt-3">
        <ToolChips
          tools={project.stack}
          label={format('toolsUsedOn', { title: words.title })}
          compact
        />
      </div>
    </article>
  );
}
