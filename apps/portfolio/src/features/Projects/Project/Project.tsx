import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Arrow } from '@/components/Arrow';
import { ToolChips } from '@/components/ToolChips';
import { imagePath, mediaDimensions, projectHref, projects } from '@/content/projects';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { Cover } from '../components/Cover';
import { ArticleBody } from './components/ArticleBody';
import { backLinkStyles, detailsStyles, moreStyles, pageStyles } from './styles';
import type { ProjectProps as Props } from './types';

/**
 * One case study: header, cover, project details, the story and a link to the next project.
 * @example
 * ```tsx
 * <Project project={project} markdown={markdown} locale="en" />
 * ```
 */
export async function Project(props: Props) {
  const { project, markdown, locale } = props;
  const { messages, format } = await getTranslator(locale);
  const words = messages.projects.items[project.slug];
  const detail = messages.projects.detail;
  const next = projects[(projects.indexOf(project) + 1) % projects.length] ?? project;
  const allProjects = localizedPath(locale, '/projects/');

  return (
    <div className={pageStyles}>
      <article>
        <header>
          <nav aria-label={detail.breadcrumb} className="text-sm font-medium">
            <VidalsLink variant="plain" href={allProjects} className={backLinkStyles}>
              <Arrow direction="left" /> <VidalsLinkLabel>{detail.allProjects}</VidalsLinkLabel>
            </VidalsLink>
          </nav>
          <div className="mx-auto max-w-3xl py-8 sm:py-12 sm:text-center">
            <p className="text-sm font-semibold text-vidals-accent">{words.category}</p>
            <h1 className="mt-3 text-balance text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">
              {words.title}
            </h1>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-vidals-muted sm:mx-auto sm:text-xl">
              {words.description}
            </p>
          </div>
        </header>
        <figure>
          <Cover project={project} locale={locale} detail />
        </figure>
        <div className="mx-auto mt-6 max-w-[70ch] sm:mt-9">
          <aside aria-label={detail.details} className={detailsStyles}>
            {project.logo && (
              <Image
                src={imagePath(project.logo)}
                alt=""
                width={mediaDimensions[project.logo]?.[0]}
                height={mediaDimensions[project.logo]?.[1]}
                unoptimized
                className="h-12 w-auto max-w-24 rounded-lg object-contain"
              />
            )}
            <dl className="grid min-w-0 flex-1 gap-x-6 gap-y-3 text-sm leading-relaxed sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <div>
                <dt className="font-semibold">{detail.context}</dt>
                <dd className="text-vidals-muted">{words.context}</dd>
              </div>
              <div>
                <dt className="font-semibold">{detail.builtWith}</dt>
                <dd className="mt-1.5">
                  <ToolChips
                    tools={project.stack}
                    label={format('toolsUsedOn', { title: words.title })}
                    compact
                  />
                </dd>
              </div>
            </dl>
          </aside>
          <section aria-label={detail.caseStudy} className="mt-9 min-w-0">
            <ArticleBody markdown={markdown} locale={locale} />
          </section>
        </div>
      </article>
      <nav aria-label={detail.moreProjects} className={moreStyles}>
        <VidalsLink
          variant="plain"
          href={allProjects}
          className={twMerge(backLinkStyles, 'text-sm')}
        >
          <Arrow direction="left" /> <VidalsLinkLabel>{detail.allProjects}</VidalsLinkLabel>
        </VidalsLink>
        <VidalsLink
          variant="plain"
          href={localizedPath(locale, projectHref(next.slug))}
          className={twMerge(backLinkStyles, 'font-semibold')}
        >
          <VidalsLinkLabel>
            {format('nextProject', { title: messages.projects.items[next.slug].title })}
          </VidalsLinkLabel>{' '}
          <Arrow />
        </VidalsLink>
      </nav>
    </div>
  );
}
