import type { ReactNode } from 'react';

export interface ArticleProseProps {
  /** Headings, paragraphs and lists to set in reading typography. */
  children: ReactNode;
  /** Extra classes, such as top spacing. */
  className?: string;
}
