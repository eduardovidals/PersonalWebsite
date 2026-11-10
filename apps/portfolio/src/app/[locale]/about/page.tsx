import { readStory } from '@/content/stories/read';
import { About } from '@/features/About';
import { aboutMetadata } from '@/features/About/metadata';
import { prefixedLocale } from '@/i18n/metadata';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: LocalePageProps) {
  return aboutMetadata(prefixedLocale((await props.params).locale));
}

export default async function LocaleAboutPage(props: LocalePageProps) {
  const locale = prefixedLocale((await props.params).locale);
  return <About locale={locale} story={await readStory(locale, 'about')} />;
}
