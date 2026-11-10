import type { LocaleId } from './locales';

/** One lazy catalog per language, so a page only loads the language it renders. */
export const loaders = {
  en: () => import('./messages/en'),
  es: () => import('./messages/es'),
  ar: () => import('./messages/ar'),
  vi: () => import('./messages/vi'),
} satisfies Record<LocaleId, () => Promise<unknown>>;
