import { Projects } from '@/features/Projects';
import { projectsMetadata } from '@/features/Projects/metadata';
import { prefixedLocale } from '@/i18n/metadata';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: LocalePageProps) {
  return projectsMetadata(prefixedLocale((await props.params).locale));
}

export default async function LocaleProjectsPage(props: LocalePageProps) {
  return <Projects locale={prefixedLocale((await props.params).locale)} />;
}
