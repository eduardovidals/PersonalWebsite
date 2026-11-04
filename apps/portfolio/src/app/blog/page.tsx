import type { Metadata } from 'next';
import Link from 'next/link';
import { author } from '@/config/site';
import { formatPostDate, getPosts, type PostSummary } from '@/content/blog';

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

function PostRow({ post, number }: { post: PostSummary; number: number }) {
  return (
    <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-b border-vidals-border py-6 sm:grid-cols-[4rem_minmax(0,1fr)_8rem] sm:gap-x-7 sm:py-9">
      <span aria-hidden="true" className="pt-1 font-mono text-sm tabular-nums text-vidals-accent">
        {String(number).padStart(2, '0')}
      </span>
      <div>
        <p className="mb-2 text-sm font-medium text-vidals-muted">{post.category}</p>
        <h2 className="text-balance text-[clamp(1.7rem,3.5vw,3.15rem)] leading-[1.04] font-bold tracking-[-.04em]">
          <Link
            href={`/blog/${post.slug}/`}
            className="decoration-1 underline-offset-4 hover:text-vidals-accent hover:underline"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-[55ch] leading-relaxed text-vidals-muted">{post.summary}</p>
      </div>
      <div className="col-start-2 mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-vidals-muted sm:col-start-auto sm:mt-0 sm:block sm:text-end">
        <time dateTime={post.date} className="font-medium text-vidals-text">
          {formatPostDate(post.date)}
        </time>
        <span className="sm:mt-1 sm:block">{post.readingMinutes} min read</span>
      </div>
    </li>
  );
}

export default function BlogPage() {
  const posts = getPosts();
  return (
    <section className="shell py-10 text-vidals-text sm:py-16">
      <header className="grid items-end gap-5 border-b-4 border-vidals-text pb-6 sm:grid-cols-[1.3fr_1fr] sm:pb-9">
        <h1 className="text-[clamp(4.75rem,13vw,10rem)] leading-[.88] font-black tracking-[-.05em]">
          Blog
        </h1>
        <p className="max-w-[24ch] font-[Georgia,serif] text-2xl leading-[1.22] italic md:text-3xl">
          Notes from my projects and what I learned while building them.
        </p>
      </header>
      <div className="flex items-baseline justify-between gap-5 border-b border-vidals-text py-3 text-sm">
        <p className="font-semibold">
          All posts{' '}
          <span className="ps-1 font-mono font-normal text-vidals-muted">({posts.length})</span>
        </p>
        <a href="/feed.xml" className="text-vidals-accent underline underline-offset-4">
          RSS feed
        </a>
      </div>
      <ol>
        {posts.map((post, index) => (
          <PostRow key={post.slug} post={post} number={index + 1} />
        ))}
      </ol>
    </section>
  );
}
