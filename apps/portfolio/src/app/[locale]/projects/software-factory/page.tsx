import { readStory } from '@/content/stories/read';
import { Velton } from '@/features/Projects/Velton';
import { veltonMetadata } from '@/features/Projects/metadata';
import { prefixedLocale } from '@/i18n/metadata';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: LocalePageProps) {
  return veltonMetadata(prefixedLocale((await props.params).locale));
}

export default async function LocaleVeltonPage(props: LocalePageProps) {
  const locale = prefixedLocale((await props.params).locale);
  return <Velton locale={locale} story={await readStory(locale, 'velton')} />;
}
