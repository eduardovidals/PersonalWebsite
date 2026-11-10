import Markdown, { type Components } from 'react-markdown';
import { ArticleProse } from '@/components/ArticleProse';
import { MarkdownLink } from '@/components/MarkdownLink';
import { getTranslator } from '@/i18n/translator';
import type { AboutProps as Props } from './types';

/**
 * The longer career story, from NJCU to Prudential and Velton.
 * @example
 * ```tsx
 * <About story={story} locale="en" />
 * ```
 */
export async function About(props: Props) {
  const { story, locale } = props;
  const { messages } = await getTranslator(locale);
  const copy = messages.about;
  const components: Components = {
    a: ({ href, children }) => (
      <MarkdownLink href={href} locale={locale}>
        {children}
      </MarkdownLink>
    ),
  };

  return (
    <article className="mx-auto w-full max-w-[48rem] px-5 pt-6 pb-12 sm:px-8 sm:pt-8 sm:pb-16">
      <p className="mb-3 font-mono text-xs text-vidals-accent">{copy.eyebrow}</p>
      <h1 className="text-balance text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
        {copy.title}
      </h1>
      <ArticleProse className="mt-8">
        <Markdown components={components}>{story}</Markdown>
      </ArticleProse>
    </article>
  );
}
