import { Home } from '@/features/Home';
import { homeMetadata } from '@/features/Home/metadata';
import { prefixedLocale } from '@/i18n/metadata';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: LocalePageProps) {
  return homeMetadata(prefixedLocale((await props.params).locale));
}

export default async function LocaleHomePage(props: LocalePageProps) {
  return <Home locale={prefixedLocale((await props.params).locale)} />;
}
