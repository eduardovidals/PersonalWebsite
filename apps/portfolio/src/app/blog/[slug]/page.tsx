import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { author } from '@/config/site';
import { formatPostDate, getPost, getPosts } from '@/content/blog';
import { articleProse } from './styles';

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug)?.summary;
  if (!post) notFound();
  const url = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.summary,
    authors: [{ name: author }],
    alternates: { canonical: url, types: { 'application/rss+xml': '/feed.xml' } },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: 'article',
      siteName: author,
      images: ['/social-card.png'],
      authors: [author],
      publishedTime: `${post.date}T00:00:00Z`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { title, summary, date, category, readingMinutes, sourceUrl } = post.summary;
  const entries = getPosts();
  const next =
    entries.length > 1
      ? entries[(entries.findIndex((entry) => entry.slug === slug) + 1) % entries.length]
      : undefined;
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
      <nav aria-label="Article breadcrumb" className="text-sm">
        <Link href="/blog/" className="text-vidals-accent underline-offset-4 hover:underline">
          <span aria-hidden="true">← </span>All posts
        </Link>
      </nav>
      <header className="mt-6 border-b border-vidals-border pb-6">
        <h1 className="text-balance text-3xl font-bold text-vidals-text sm:text-4xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-vidals-muted">{summary}</p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-vidals-muted">
          <span className="font-medium text-vidals-text">{author}</span>
          <time dateTime={date}>{formatPostDate(date)}</time>
          <span>{category}</span>
          <span>{readingMinutes} min read</span>
        </div>
      </header>
      <div className={articleProse}>
        <Markdown>{post.body}</Markdown>
      </div>
      {sourceUrl && (
        <p className="mt-8 text-sm leading-relaxed text-vidals-muted">
          Adapted from my{' '}
          <a href={sourceUrl} className="text-vidals-accent underline underline-offset-4">
            original project write-up
          </a>
          , archived on {formatPostDate(date)}.
        </p>
      )}
      {next && (
        <aside className="mt-8 border-t border-vidals-border pt-5">
          <p className="text-sm text-vidals-muted">Another post</p>
          <Link
            className="mt-1 inline-block font-semibold text-vidals-accent underline-offset-4 hover:underline"
            href={`/blog/${next.slug}/`}
          >
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      )}
    </article>
  );
}
