import type { ReactNode } from 'react';
import type { LocaleId } from '@/i18n/locales';

export interface RootDocumentProps {
  /** The language every page under this root layout renders in. */
  locale: LocaleId;
  /** The page. */
  children: ReactNode;
}
