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
    <article className="shell pb-20 pt-10 md:pb-28 md:pt-16">
      <nav
        aria-label="Article breadcrumb"
        className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[.11em] text-muted"
      >
        <Link href="/blog/" className="text-ink underline-offset-4 hover:underline">
          <span aria-hidden="true">← </span>Field notes
        </Link>
        <span aria-hidden="true">/</span>
        <span>{category}</span>
      </nav>
      <header className="border-b border-line pb-8 pt-10 md:pb-12 md:pt-16">
        <p className="font-mono text-xs uppercase tracking-[.14em] text-accent">
          {sourceUrl ? 'From the archive' : 'Field note'}
        </p>
        <h1 className="mt-4 max-w-[16ch] text-balance font-serif text-5xl leading-[1.01] tracking-[-.055em] text-ink sm:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-muted sm:text-xl">{summary}</p>
      </header>
      <div className="grid items-start gap-7 py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-12 md:py-12">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-muted md:grid md:gap-y-2">
          <p className="font-medium text-ink">{author}</p>
          <time dateTime={date}>{formatPostDate(date)}</time>
          <p className="font-mono text-[.66rem] uppercase tracking-[.1em]">
            {readingMinutes} min read
          </p>
        </div>
        <div className="min-w-0 max-w-[66ch]">
          <div className={articleProse}>
            <Markdown>{post.body}</Markdown>
          </div>
          {sourceUrl && (
            <p className="mt-10 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              Adapted from my{' '}
              <a href={sourceUrl} className="text-ink underline underline-offset-4">
                original project write-up
              </a>
              , archived on {formatPostDate(date)}.
            </p>
          )}
        </div>
      </div>
      {next && (
        <aside className="mt-5 border-y border-line py-6">
          <Link
            className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-2"
            href={`/blog/${next.slug}/`}
          >
            <span className="font-mono text-xs uppercase tracking-[.14em] text-muted">
              Another field note
            </span>
            <span className="font-serif text-2xl tracking-tight text-ink group-hover:underline decoration-1 underline-offset-4">
              {next.title}{' '}
              <span aria-hidden="true" className="text-accent">
                →
              </span>
            </span>
          </Link>
        </aside>
      )}
    </article>
  );
}
