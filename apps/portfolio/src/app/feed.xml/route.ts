import { author, siteUrl } from '@/config/site';
import { getPosts } from '@/content/blog';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const posts = getPosts();
  const items = posts.map((post) => {
    const url = escapeXml(new URL(`/blog/${post.slug}/`, siteUrl).href);
    return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(post.summary)}</description>
    <category>${escapeXml(post.category)}</category>
    <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
  </item>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Field notes — ${escapeXml(author)}</title>
  <link>${escapeXml(siteUrl)}/blog/</link>
  <atom:link href="${escapeXml(siteUrl)}/feed.xml" rel="self" type="application/rss+xml" />
  <description>Engineering notes on design systems, reusable software, and visual experiments by ${escapeXml(author)}.</description>
  <language>en</language>
${items.join('\n')}
</channel>
</rss>
`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
