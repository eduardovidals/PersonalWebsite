import { pageMetadata } from '@/i18n/metadata';
import type { LocaleId } from '@/i18n/locales';

/** The homepage's canonical and alternate URLs; its title and description come from the layout. */
export function homeMetadata(locale: LocaleId) {
  return pageMetadata({ locale, path: '/' });
}
