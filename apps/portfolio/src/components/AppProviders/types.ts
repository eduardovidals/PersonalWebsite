import type { ReactNode } from 'react';

export interface AppProvidersProps {
  /** BCP 47 tag of the page's language, for React Aria's direction and formatting. */
  locale: string;
  /** The page. */
  children: ReactNode;
}
