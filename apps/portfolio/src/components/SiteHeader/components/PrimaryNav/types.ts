import type { HeaderLink } from '../../types';

export interface PrimaryNavProps {
  /** Accessible name of the navigation landmark. */
  label: string;
  /** Header destinations with localized words and URLs. */
  links: readonly HeaderLink[];
}
