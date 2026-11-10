import type { CSSProperties } from 'react';

/** One destination in the phone menu. */
export interface VidalsMenuItem {
  /** Visible link text. */
  label: string;
  /** Destination. Same-site paths go through the app's React Aria `RouterProvider`. */
  href: string;
  /** Marks the page the reader is on (`page`) or a section of it (`location`). */
  current?: 'page' | 'location';
}

export interface VidalsMobileMenuProps {
  /** Primary destinations, shown large. */
  items: readonly VidalsMenuItem[];
  /** Secondary links such as profiles, shown small after the primary list. */
  secondaryItems?: readonly VidalsMenuItem[];
  /** Distance from the top of the viewport to the panel, usually the sticky header height. */
  topOffset?: string;
  /** Accessible name of the menu dialog. Defaults to "Site navigation". */
  label?: string;
  /** Accessible name of the closed menu button. Defaults to "Open menu". */
  openLabel?: string;
  /** Accessible name of the open menu button. Defaults to "Close menu". */
  closeLabel?: string;
  /** Accessible name of the links' navigation landmark. Defaults to "Mobile". */
  navigationLabel?: string;
  /** Classes for the wrapper around the menu button. */
  className?: string;
}

/** Row position that staggers each row's entrance animation. */
export interface MenuRowStyle extends CSSProperties {
  '--menu-item': number;
}
