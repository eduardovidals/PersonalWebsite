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

function PostRow({ post }: { post: PostSummary }) {
  return (
    <li className="py-7">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-vidals-muted">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.category}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-vidals-text">
        <Link
          href={`/blog/${post.slug}/`}
          className="underline-offset-4 hover:text-vidals-accent hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 leading-relaxed text-vidals-muted">{post.summary}</p>
    </li>
  );
}

export default function BlogPage() {
  const posts = getPosts();
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
      <header className="border-b border-vidals-border pb-7">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-4xl font-bold text-vidals-text sm:text-5xl">Blog</h1>
          <a
            href="/feed.xml"
            className="shrink-0 text-sm text-vidals-accent underline underline-offset-4"
          >
            RSS feed
          </a>
        </div>
        <p className="mt-3 leading-relaxed text-vidals-muted sm:text-lg">
          Notes from my projects and what I learned while building them.
        </p>
      </header>
      <ol className="divide-y divide-vidals-border">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </ol>
    </section>
  );
}
