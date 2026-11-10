import { imagePath, mediaDimensions, projectHref, projects } from '@/content/projects';
import { pageMetadata } from '@/i18n/metadata';
import type { LocaleId } from '@/i18n/locales';
import { getTranslator } from '@/i18n/translator';

export async function projectsMetadata(locale: LocaleId) {
  const { messages } = await getTranslator(locale);
  const { title, description } = messages.projects.page;
  return pageMetadata({ locale, path: '/projects/', title, description });
}

export async function veltonMetadata(locale: LocaleId) {
  const { messages } = await getTranslator(locale);
  const { title, description } = messages.velton;
  return pageMetadata({
    locale,
    path: '/projects/software-factory/',
    title,
    description,
    type: 'article',
    images: [],
  });
}

/** Finds a case study by its route parameter; unknown slugs are not built. */
export function projectForSlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function projectMetadata(locale: LocaleId, slug: string) {
  const project = projectForSlug(slug);
  if (!project) return {};
  const { messages } = await getTranslator(locale);
  const words = messages.projects.items[project.slug];
  const [width, height] = mediaDimensions[project.cover] ?? [];
  return pageMetadata({
    locale,
    path: projectHref(project.slug),
    title: words.title,
    description: words.description,
    type: 'article',
    images: [{ url: imagePath(project.cover), alt: words.coverAlt, width, height }],
  });
}
