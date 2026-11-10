import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import Markdown, { type Components } from 'react-markdown';
import { Arrow } from '@/components/Arrow';
import { ArticleProse } from '@/components/ArticleProse';
import { MarkdownLink } from '@/components/MarkdownLink';
import { ToolChips } from '@/components/ToolChips';
import { softwareFactory } from '@/content/projects/current-work';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { pageStyles, principleListStyles, principleStyles, principleTitleStyles } from './styles';
import type { VeltonProps as Props } from './types';

/**
 * The Velton founder story. Its three principles render as small stacked cards: a short heading
 * over its explanation.
 * @example
 * ```tsx
 * <Velton story={story} locale="en" />
 * ```
 */
export async function Velton(props: Props) {
  const { story, locale } = props;
  const { messages, format } = await getTranslator(locale);
  const copy = messages.velton;
  const components: Components = {
    ul: ({ children }) => <ul className={principleListStyles}>{children}</ul>,
    li: ({ children }) => <li className={principleStyles}>{children}</li>,
    strong: ({ children }) => <strong className={principleTitleStyles}>{children}</strong>,
    a: ({ href, children }) => (
      <MarkdownLink href={href} locale={locale}>
        {children}
      </MarkdownLink>
    ),
  };

  return (
    <article className={pageStyles}>
      <VidalsLink
        variant="plain"
        href={localizedPath(locale, '/projects/')}
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-vidals-accent"
      >
        <Arrow direction="left" /> <VidalsLinkLabel>{copy.backToProjects}</VidalsLinkLabel>
      </VidalsLink>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">{copy.title}</h1>
      <p className="mt-4 text-pretty text-xl leading-relaxed text-vidals-muted">{copy.subtitle}</p>
      <ArticleProse className="mt-7">
        <Markdown components={components}>{story}</Markdown>
      </ArticleProse>
      <div className="mt-8">
        <ToolChips
          label={format('toolsUsedOn', { title: copy.title })}
          tools={softwareFactory.stack}
          compact
        />
      </div>
      <VidalsLink
        variant="plain"
        href={localizedPath(locale, '/about/')}
        className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-vidals-accent"
      >
        <VidalsLinkLabel>{copy.careerStory}</VidalsLinkLabel> <Arrow />
      </VidalsLink>
    </article>
  );
}
