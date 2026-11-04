import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { author } from '@/config/site';
import { formatPostDate, getPost, getPosts } from '@/content/blog';
import { articleProse } from '@/components/article-prose';

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
    <article className="mx-auto w-full max-w-[48rem] px-5 py-10 text-vidals-text sm:px-8 sm:py-16">
      <nav aria-label="Article breadcrumb" className="text-sm font-medium">
        <Link href="/blog/" className="text-vidals-accent underline-offset-4 hover:underline">
          <span aria-hidden="true">← </span>All posts
        </Link>
      </nav>
      <header className="mt-8">
        <p className="text-sm font-semibold text-vidals-accent">{category}</p>
        <h1 className="mt-3 text-balance text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-vidals-muted">{summary}</p>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-vidals-muted">
          <span className="font-semibold text-vidals-text">By {author}</span>
          <time dateTime={date}>{formatPostDate(date)}</time>
          <span>{readingMinutes} min read</span>
        </div>
      </header>
      <div className="mt-10">
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
      </div>
      {next && (
        <aside className="mt-10 rounded-2xl bg-vidals-surface p-5 sm:p-6">
          <p className="text-sm text-vidals-muted">Another post</p>
          <Link
            className="mt-1 inline-block text-xl font-semibold text-vidals-accent underline-offset-4 hover:underline"
            href={`/blog/${next.slug}/`}
          >
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      )}
    </article>
  );
}
