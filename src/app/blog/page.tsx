import type { Metadata } from 'next';
import Link from 'next/link';
import { author } from '@/config/site';
import { formatPostDate, getPosts, type PostSummary } from '@/content/blog';
import { SearchFigure } from './search-figure';

const description = `Engineering field notes by ${author}, with examples from the projects behind them.`;

export const metadata: Metadata = {
  title: 'Field notes',
  description,
  alternates: { canonical: '/blog/', types: { 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    title: `Field notes — ${author}`,
    siteName: author,
    description,
    url: '/blog/',
    type: 'website',
    images: ['/social-card.png'],
  },
};

function PostRow({ post }: { post: PostSummary }) {
  return (
    <li className="border-b border-line">
      <Link
        href={`/blog/${post.slug}/`}
        aria-labelledby={`post-${post.slug}`}
        className="group grid gap-3 py-7 sm:grid-cols-[9rem_1fr_auto] sm:gap-8 sm:py-9"
      >
        <div className="flex items-center gap-3 text-sm text-muted sm:block sm:pt-1">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest sm:mt-2 sm:block">
            {post.readingMinutes} min read
          </span>
        </div>
        <div>
          <span className="font-mono text-[0.66rem] uppercase tracking-[.13em] text-accent">
            {post.category}
          </span>
          <h2
            id={`post-${post.slug}`}
            className="mt-1 font-serif text-3xl leading-tight tracking-tight text-ink group-hover:underline decoration-1 underline-offset-4 sm:text-4xl"
          >
            {post.title}
          </h2>
          <p className="mt-2 max-w-[62ch] leading-relaxed text-muted">{post.summary}</p>
        </div>
        <span aria-hidden="true" className="hidden self-center text-xl text-accent sm:block">
          →
        </span>
      </Link>
    </li>
  );
}

export default function BlogPage() {
  const posts = getPosts();
  return (
    <section className="shell pb-20 md:pb-28">
      <header className="grid items-end gap-9 pb-12 pt-16 sm:grid-cols-[minmax(0,1.7fr)_minmax(11rem,1fr)] md:gap-20 md:pb-16 md:pt-24">
        <div>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[.16em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" /> The journal
          </p>
          <h1 className="mt-5 font-serif text-6xl leading-none tracking-[-.06em] text-ink sm:text-7xl md:text-8xl">
            Field notes<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-[39ch] text-lg leading-relaxed text-muted md:text-xl">
            Notes on building software, told through the small decisions inside a project.
          </p>
        </div>
        <div className="hidden sm:block">
          <SearchFigure />
        </div>
      </header>
      <div className="flex items-center justify-between gap-3 border-y border-line py-3 font-mono text-xs uppercase tracking-[.12em]">
        <p className="text-ink">
          All entries{' '}
          <span className="ml-2 text-muted">({String(posts.length).padStart(2, '0')})</span>
        </p>
        <a
          className="text-muted underline-offset-4 hover:text-accent hover:underline"
          href="/feed.xml"
        >
          RSS feed <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ol>
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </ol>
    </section>
  );
}
