import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/site';
import { getPosts } from '@/content/blog';
import { projectSlugs } from '@/content/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/projects/',
    '/blog/',
    ...projectSlugs.map((slug) => '/projects/' + slug + '/'),
    ...getPosts().map((post) => '/blog/' + post.slug + '/'),
  ].map((path) => ({ url: siteUrl + path }));
}
