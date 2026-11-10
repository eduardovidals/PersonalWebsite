import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/site';
import { isDeployPreview } from '@/config/server';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (isDeployPreview) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return { rules: { userAgent: '*', allow: '/' }, sitemap: siteUrl + '/sitemap.xml' };
}
