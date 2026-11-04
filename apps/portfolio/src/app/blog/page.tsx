import type { Metadata } from 'next';
import Link from 'next/link';
import { author } from '@/config/site';
import { formatPostDate, getPosts, type PostSummary } from '@/content/blog';
import { artworkForPost, PostArtwork } from './post-artwork';

const description = `Writing by ${author} on design systems, Software Factory, and the visual experiments that got him into programming.`;

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: '/blog/', types: { 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    title: `Blog — ${author}`,
    siteName: author,
    description,
    url: '/blog/',
    type: 'website',
    images: ['/social-card.png'],
  },
};

function PostDetails({ post }: { post: PostSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-vidals-muted">
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

export default function BlogPage() {
  const [latest, ...earlier] = getPosts();
  const leadArt = latest && artworkForPost(latest.slug);
  return (
    <section className="shell py-12 text-vidals-text sm:py-20">
      <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Blog</h1>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-vidals-muted">
            Why I’m building Software Factory, what I learned working on design systems, and a few
            experiments from my time studying computer science.
          </p>
        </div>
        <a
          href="/feed.xml"
          className="text-sm font-semibold text-vidals-accent underline-offset-4 hover:underline"
        >
          RSS feed
        </a>
      </header>
      {latest && (
        <article className="mt-9 rounded-3xl bg-vidals-surface">
          <Link
            href={`/blog/${latest.slug}/`}
            aria-labelledby="latest-post"
            className={
              leadArt
                ? 'group grid items-center gap-2 rounded-3xl p-3 sm:grid-cols-[1.05fr_1fr] sm:gap-5 sm:p-5'
                : 'group block rounded-3xl p-4'
            }
          >
            {leadArt && <PostArtwork project={leadArt} />}
            <div className="p-3 sm:py-5 sm:pe-6">
              <p className="text-sm font-semibold text-vidals-accent">{latest.category}</p>
              <h2
                id="latest-post"
                className="mt-2 max-w-[19ch] text-balance text-3xl leading-tight font-semibold tracking-tight group-hover:text-vidals-accent lg:text-4xl"
              >
                {latest.title}
              </h2>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-vidals-muted">
                {latest.summary}
              </p>
              <div className="mt-5">
                <PostDetails post={latest} />
              </div>
            </div>
          </Link>
        </article>
      )}
      {earlier.length > 0 && (
        <section aria-labelledby="earlier-posts" className="mt-12 sm:mt-16">
          <h2 id="earlier-posts" className="text-2xl font-semibold tracking-tight">
            Earlier posts
          </h2>
          <ol className="mt-6 space-y-9">
            {earlier.map((post) => {
              const art = artworkForPost(post.slug);
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    aria-labelledby={`post-${post.slug}`}
                    className={
                      art
                        ? 'group grid max-w-4xl items-center gap-5 rounded-xl sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-7'
                        : 'group block max-w-4xl'
                    }
                  >
                    {art && (
                      <div className="max-w-48">
                        <PostArtwork project={art} small />
                      </div>
                    )}
                    <div>
                      <PostDetails post={post} />
                      <h3
                        id={`post-${post.slug}`}
                        className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-vidals-accent"
                      >
                        {post.title}
                      </h3>
                      <p className="mt-2 max-w-[55ch] leading-relaxed text-vidals-muted">
                        {post.summary}
                      </p>
                      <p className="mt-2 text-sm text-vidals-accent">{post.category}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </section>
  );
}
