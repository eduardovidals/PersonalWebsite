import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface PostSummary {
  slug: string;
  title: string;
  summary: string;
  caption: string;
  /** Original note date for archival adaptations; otherwise publication date. */
  date: string;
  category: string;
  readingMinutes: number;
  /** When present, links back to the original note in its historical context. */
  sourceUrl?: string;
}

interface Post {
  summary: PostSummary;
  body: string;
}

const directory = path.join(process.cwd(), 'src/content/blog');
const dateFormat = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatPostDate(date: string): string {
  return dateFormat.format(new Date(`${date}T00:00:00Z`));
}

function readPost(filename: string): Post {
  const slug = path.basename(filename, '.md');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid blog filename: ${filename}. Use a lowercase, hyphenated slug.`);
  }
  const { data, content } = matter(readFileSync(path.join(directory, filename), 'utf8'));
  function field(key: string): string {
    const value: unknown = data[key];
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error(`${filename}: expected a nonempty string for "${key}".`);
    }
    return value.trim();
  }
  const date = field('date');
  const timestamp = Date.parse(`${date}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(timestamp) ||
    new Date(timestamp).toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`${filename}: expected a quoted YYYY-MM-DD calendar date.`);
  }
  const body = content.trim();
  if (!body) throw new Error(`${filename}: the post has no content.`);
  const sourceUrl = data.sourceUrl === undefined ? undefined : field('sourceUrl');
  if (sourceUrl && new URL(sourceUrl).protocol !== 'https:') {
    throw new Error(`${filename}: expected an HTTPS source URL.`);
  }
  return {
    summary: {
      slug,
      title: field('title'),
      summary: field('summary'),
      caption: field('caption'),
      date,
      category: field('category'),
      readingMinutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 220)),
      sourceUrl,
    },
    body,
  };
}

// Read only the authored files; a URL parameter is never used as a filesystem path.
const allPosts = cache(() =>
  readdirSync(directory)
    .filter((name) => name.endsWith('.md'))
    .map(readPost)
    .sort(
      (a, b) =>
        b.summary.date.localeCompare(a.summary.date) ||
        a.summary.slug.localeCompare(b.summary.slug),
    ),
);

export function getPosts(): PostSummary[] {
  return allPosts().map((post) => post.summary);
}

export function getPost(slug: string): Post | undefined {
  return allPosts().find((post) => post.summary.slug === slug);
}
