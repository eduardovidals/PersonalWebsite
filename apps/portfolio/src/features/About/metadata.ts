import { pageMetadata } from '@/i18n/metadata';
import type { LocaleId } from '@/i18n/locales';
import { getTranslator } from '@/i18n/translator';

export async function aboutMetadata(locale: LocaleId) {
  const { messages } = await getTranslator(locale);
  const { title, description } = messages.about;
  return pageMetadata({ locale, path: '/about/', title, description });
}
