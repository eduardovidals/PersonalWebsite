import { notFound } from 'next/navigation';
import { projectSlugs } from '@/content/projects';
import { readStory } from '@/content/stories/read';
import { Project } from '@/features/Projects/Project';
import { projectForSlug, projectMetadata } from '@/features/Projects/metadata';
import { prefixedLocale } from '@/i18n/metadata';

interface LocaleProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: LocaleProjectPageProps) {
  const { locale, slug } = await props.params;
  return projectMetadata(prefixedLocale(locale), slug);
}

export default async function LocaleProjectPage(props: LocaleProjectPageProps) {
  const params = await props.params;
  const locale = prefixedLocale(params.locale);
  const project = projectForSlug(params.slug) ?? notFound();
  // Resolve through the catalog before reading disk; only known slugs become paths.
  return (
    <Project locale={locale} project={project} markdown={await readStory(locale, project.slug)} />
  );
}
