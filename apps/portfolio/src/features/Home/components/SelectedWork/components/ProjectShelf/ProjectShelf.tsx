import { VidalsDisclosure, VidalsLink } from '@vidals/react-components';
import { ArchiveArtwork } from '@/components/ArchiveArtwork';
import { Arrow } from '@/components/Arrow';
import { ToolChips } from '@/components/ToolChips';
import { projectHref, projects, type ProjectSlug } from '@/content/projects';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { PathPlate } from './components/PathPlate';
import { searchPlate } from './components/PathPlate/searchPlate';
import { demoTriggerStyles, gridStyles, titleStyles } from './styles';
import type { ProjectShelfProps as Props } from './types';

/** The homepage's early-project order: the most visual work first. */
const order: readonly ProjectSlug[] = [
  'solar-system',
  'props',
  'pathfinding-visualizer',
  'benev',
  '3d-sorting-visualizer',
  'sorting-visualizer',
];

/**
 * The early projects as cards that open each case study, with a live pathfinding demo.
 * @example
 * ```tsx
 * <ProjectShelf locale="en" />
 * ```
 */
export async function ProjectShelf(props: Props) {
  const { locale } = props;
  const { messages, format } = await getTranslator(locale);
  const gallery = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  const plate = messages.home.pathPlate;
  const steps = searchPlate.steps;

  return (
    <div className={gridStyles}>
      {gallery.map((project) => {
        const words = messages.projects.items[project.slug];
        return (
          <article key={project.slug} className="min-w-0">
            <VidalsLink
              variant="plain"
              href={localizedPath(locale, projectHref(project.slug))}
              aria-labelledby={`home-project-${project.slug}`}
              className="group block rounded-3xl"
            >
              <div className="mb-3 px-1">
                <p className="text-sm font-medium text-vidals-accent">{words.context}</p>
                <h3 id={`home-project-${project.slug}`} className={titleStyles}>
                  {words.title}
                  <Arrow direction="up-right" className="text-base text-vidals-muted" />
                </h3>
              </div>
              <ArchiveArtwork project={project} locale={locale} />
              <p className="mt-3 max-w-[50ch] px-1 text-[15px] leading-relaxed text-vidals-muted">
                {words.caption}
              </p>
            </VidalsLink>
            <div className="mt-3 px-1">
              <ToolChips
                tools={project.stack}
                label={format('toolsUsedOn', { title: words.title })}
                compact
              />
            </div>
            {project.slug === 'pathfinding-visualizer' && (
              <VidalsDisclosure
                trigger={messages.home.selectedWork.pathDemo}
                className="mt-2 px-1"
                triggerClassName={demoTriggerStyles}
              >
                <PathPlate
                  labels={{
                    algorithm: plate.algorithm,
                    legend: plate.legend,
                    title: plate.title,
                    description: format('mazeDescription', { count: steps }),
                    shortestRoute: format('shortestRoute', { count: steps }),
                    finish: plate.finish,
                    replay: plate.replay,
                    searching: plate.searching,
                    complete: format('searchComplete', { count: steps }),
                    replayNumber: format('replayNumber', { count: '{{count}}' }),
                  }}
                />
              </VidalsDisclosure>
            )}
          </article>
        );
      })}
    </div>
  );
}
