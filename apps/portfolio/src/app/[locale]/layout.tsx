import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { prefixedLocale, prefixedLocaleParams, rootMetadata } from '@/i18n/metadata';
import '../globals.css';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocaleParams();
}

export async function generateMetadata(props: LocaleLayoutProps) {
  const { locale } = await props.params;
  return rootMetadata(prefixedLocale(locale));
}

/** Spanish, Arabic and Vietnamese pages under /es/, /ar/ and /vi/. */
export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { locale } = await props.params;
  return <RootDocument locale={prefixedLocale(locale)}>{props.children}</RootDocument>;
}
