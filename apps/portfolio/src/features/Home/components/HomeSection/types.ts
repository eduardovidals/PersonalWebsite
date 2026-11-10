import type { ReactNode } from 'react';

/** Background tone that separates neighboring sections. */
export type HomeSectionTone = 'plain' | 'tinted' | 'closing';

export interface HomeSectionProps {
  /** Element ID, also the section tab's URL fragment. */
  id: string;
  /** ID of the section's heading, which names the region. */
  labelledBy: string;
  /** Defaults to `plain`. */
  tone?: HomeSectionTone;
  children: ReactNode;
}
