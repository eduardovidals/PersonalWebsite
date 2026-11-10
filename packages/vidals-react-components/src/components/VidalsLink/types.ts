import type { ComponentPropsWithRef } from 'react';
import type { Link } from 'react-aria-components';

/** How a link looks: words inside text, a filled or quiet call to action, or no default styling. */
export type VidalsLinkVariant = 'inline' | 'primary' | 'secondary' | 'plain';

/** React Aria link props plus the Vidals appearance. */
export interface VidalsLinkProps extends ComponentPropsWithRef<typeof Link> {
  /** `inline` for links inside text, `primary` and `secondary` for calls to action, and `plain` when
   * `className` owns every style. Defaults to `inline`. */
  variant?: VidalsLinkVariant;
}
