import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/site';
import { projectHref, projectSlugs } from '@/content/projects';
import { localeIds } from '@/i18n/locales';
import { languageAlternates, localizedPath } from '@/i18n/paths';

export const dynamic = 'force-static';

const paths = [
  '/',
  '/about/',
  '/projects/',
  '/projects/software-factory/',
  ...projectSlugs.map(projectHref),
];

/** Every page in every language, each listing its translations for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    localeIds.map((locale) => ({
      url: siteUrl + localizedPath(locale, path),
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(locale, path).languages).map(([id, href]) => [
            id,
            siteUrl + href,
          ]),
        ),
      },
    })),
  );
}
