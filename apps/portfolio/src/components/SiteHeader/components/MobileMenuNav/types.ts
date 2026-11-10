import type { HeaderLink } from '../../types';

export interface MobileMenuNavProps {
  /** Header destinations with localized words and URLs. */
  links: readonly HeaderLink[];
  /** Localized names for the menu button, dialog and navigation landmark. */
  labels: { open: string; close: string; dialog: string; navigation: string };
}
