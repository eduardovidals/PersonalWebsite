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
    <article className="shell py-9 text-vidals-text sm:py-14">
      <nav
        aria-label="Article breadcrumb"
        className="flex items-center justify-between gap-4 border-b border-vidals-text pb-3 text-sm"
      >
        <Link href="/blog/" className="text-vidals-accent underline-offset-4 hover:underline">
          <span aria-hidden="true">← </span>All posts
        </Link>
        <span className="font-medium">{category}</span>
      </nav>
      <header className="py-7 sm:py-10">
        <h1 className="max-w-[15ch] text-balance text-[clamp(2.9rem,8vw,6.75rem)] leading-[.96] font-black tracking-[-.045em]">
          {title}
        </h1>
        <p className="mt-5 max-w-[46ch] font-[Georgia,serif] text-2xl leading-[1.3] italic sm:text-3xl">
          {summary}
        </p>
      </header>
      <div className="grid items-start gap-x-10 gap-y-6 border-t-2 border-vidals-text pt-5 md:grid-cols-[minmax(8rem,1fr)_minmax(0,3fr)] md:pt-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-vidals-muted md:grid md:gap-y-1.5">
          <span className="font-semibold text-vidals-text">By {author}</span>
          <time dateTime={date}>{formatPostDate(date)}</time>
          <span>{readingMinutes} min read</span>
        </div>
        <div className="min-w-0 max-w-[68ch]">
          <div className={articleProse}>
            <Markdown>{post.body}</Markdown>
          </div>
          {sourceUrl && (
            <p className="mt-8 border-t border-vidals-border pt-4 text-sm leading-relaxed text-vidals-muted">
              Adapted from my{' '}
              <a href={sourceUrl} className="text-vidals-accent underline underline-offset-4">
                original project write-up
              </a>
              , archived on {formatPostDate(date)}.
            </p>
          )}
        </div>
      </div>
      {next && (
        <aside className="mt-12 flex flex-wrap items-baseline justify-between gap-2 border-t-2 border-vidals-text pt-4">
          <p className="text-sm text-vidals-muted">Another post</p>
          <Link
            className="font-[Georgia,serif] text-2xl italic text-vidals-accent underline-offset-4 hover:underline"
            href={`/blog/${next.slug}/`}
          >
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      )}
    </article>
  );
}
