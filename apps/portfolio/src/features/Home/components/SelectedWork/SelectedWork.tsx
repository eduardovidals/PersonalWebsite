import { VidalsDisclosure, VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import { Arrow } from '@/components/Arrow';
import { WorkVisual } from '@/components/WorkVisual';
import { projects } from '@/content/projects';
import { currentWork, softwareFactory, type WorkId } from '@/content/projects/current-work';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { HomeSection, headingStyles } from '../HomeSection';
import { ProjectShelf } from './components/ProjectShelf';
import {
  disclosureTriggerStyles,
  featuredLinkStyles,
  featuredStyles,
  headerStyles,
  sectionLinkStyles,
  workLinkStyles,
} from './styles';
import type { SelectedWorkProps as Props } from './types';

/** Work shown beside Velton, with the homepage's own one-line summaries. */
const highlights = ['design-system', 'anniversary'] as const satisfies readonly WorkId[];

/**
 * The homepage's work section: Velton featured first, two highlights, a link to every project and
 * the early projects behind a disclosure.
 * @example
 * ```tsx
 * <SelectedWork locale="en" />
 * ```
 */
export async function SelectedWork(props: Props) {
  const { locale } = props;
  const { messages, format } = await getTranslator(locale);
  const copy = messages.home.selectedWork;
  const summaries = { 'design-system': copy.designSystem, anniversary: copy.anniversary };

  return (
    <HomeSection id="projects" labelledBy="projects-heading" tone="tinted">
      <div className={headerStyles}>
        <h2 id="projects-heading" className={headingStyles}>
          {copy.title}
        </h2>
        <VidalsLink
          variant="plain"
          href={localizedPath(locale, '/projects/')}
          className={sectionLinkStyles}
        >
          <VidalsLinkLabel>
            {format('allProjects', { count: currentWork.length + projects.length })}
          </VidalsLinkLabel>
          <Arrow />
        </VidalsLink>
      </div>
      <article aria-labelledby="featured-factory" data-ripple="" className={featuredStyles}>
        <div>
          <h3
            id="featured-factory"
            className="text-3xl font-semibold tracking-tight group-hover:text-vidals-accent"
          >
            {messages.projects.work[softwareFactory.id].title}
          </h3>
          <p className="mt-3 max-w-[49ch] leading-relaxed text-vidals-muted">
            {copy.featuredDescription}
          </p>
          <VidalsLink
            variant="plain"
            href={localizedPath(locale, '/projects/software-factory/')}
            className={featuredLinkStyles}
          >
            <VidalsLinkLabel>{copy.featuredLink}</VidalsLinkLabel> <Arrow />
          </VidalsLink>
        </div>
        <WorkVisual work={softwareFactory} locale={locale} compact />
      </article>
      <div className="mb-4 grid sm:grid-cols-2 sm:gap-5">
        {currentWork
          .filter((work) => highlights.some((id) => id === work.id))
          .map((work) => {
            const title = messages.projects.work[work.id].title;
            return (
              <VidalsLink
                key={work.id}
                variant="plain"
                href={localizedPath(locale, '/projects/#' + work.id)}
                data-ripple=""
                aria-label={format('seeWork', { title })}
                className={workLinkStyles}
              >
                <div className="w-20 shrink-0 sm:w-24">
                  <WorkVisual work={work} locale={locale} compact />
                </div>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-lg font-semibold group-hover:text-vidals-accent">
                    {title} <Arrow />
                  </h3>
                  <p className="mt-1 text-sm text-vidals-muted">
                    {work.id === 'anniversary' ? summaries.anniversary : summaries['design-system']}
                  </p>
                </div>
              </VidalsLink>
            );
          })}
      </div>
      <VidalsDisclosure
        trigger={
          <VidalsLinkLabel>{format('earlyProjects', { count: projects.length })}</VidalsLinkLabel>
        }
        triggerClassName={disclosureTriggerStyles}
      >
        <div className="pt-5">
          <ProjectShelf locale={locale} />
        </div>
      </VidalsDisclosure>
    </HomeSection>
  );
}
