import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isDeployPreview } from '@/config/server';
import { siteUrl } from '@/config/site';
import { isLocaleId, locales, prefixedLocaleIds, type LocaleId } from './locales';
import { languageAlternates } from './paths';
import { getTranslator } from './translator';

/** Narrows a `[locale]` route parameter, rejecting English (served unprefixed) and unknown tags. */
export function prefixedLocale(value: string): LocaleId {
  if (isLocaleId(value) && prefixedLocaleIds.includes(value)) return value;
  notFound();
}

/** Static parameters for the `[locale]` routes. */
export function prefixedLocaleParams() {
  return prefixedLocaleIds.map((locale) => ({ locale }));
}

/** Site-wide metadata for a language's root layout. */
export async function rootMetadata(locale: LocaleId): Promise<Metadata> {
  const { messages } = await getTranslator(locale);
  const { title, titleTemplate, siteName, description } = messages.common.metadata;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: titleTemplate },
    description,
    authors: [{ name: siteName }],
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      locale: locales[locale].openGraphLocale,
      images: ['/social-card.png'],
    },
    twitter: { card: 'summary_large_image' },
    robots: isDeployPreview ? { index: false, follow: false } : undefined,
  };
}

interface PageMetadataInput {
  locale: LocaleId;
  /** The page's English path, such as `/about/`. */
  path: string;
  /** Omit on the homepage, which uses the site title. */
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  images?: NonNullable<Metadata['openGraph']>['images'];
}

/** One page's metadata: canonical and hreflang URLs plus Open Graph in the page's language. */
export async function pageMetadata(input: PageMetadataInput): Promise<Metadata> {
  const {
    locale,
    path,
    title,
    description,
    type = 'website',
    images = ['/social-card.png'],
  } = input;
  const alternates = languageAlternates(locale, path);
  const { messages } = await getTranslator(locale);
  const { titleTemplate, siteName } = messages.common.metadata;

  // Leave out what the page does not set, so the layout's title and description still apply.
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates,
    openGraph: {
      type,
      siteName,
      ...(title && { title: titleTemplate.replace('%s', title) }),
      ...(description && { description }),
      url: alternates.canonical,
      locale: locales[locale].openGraphLocale,
      images,
    },
  };
}
