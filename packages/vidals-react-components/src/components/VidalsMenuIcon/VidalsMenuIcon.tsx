import { twMerge } from 'tailwind-merge';
import {
  barClosedTimingStyles,
  barOpenTimingStyles,
  barStyles,
  bottomBarOpenStyles,
  iconStyles,
  middleBarClosedStyles,
  middleBarOpenStyles,
  middleBarStyles,
  topBarOpenStyles,
} from './styles.js';
import type { VidalsMenuIconProps as Props } from './types.js';

/**
 * A decorative menu glyph: the outer bars slide together, then rotate into an X; closing reverses it.
 * @example
 * ```tsx
 * <VidalsMenuIcon isOpen={open} />
 * ```
 */
export function VidalsMenuIcon(props: Props) {
  const { isOpen, className } = props;
  const timing = isOpen ? barOpenTimingStyles : barClosedTimingStyles;

  return (
    <svg
      aria-hidden="true"
      data-open={isOpen || undefined}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={twMerge(iconStyles, className)}
    >
      <path d="M4 7h16" className={twMerge(barStyles, timing, isOpen && topBarOpenStyles)} />
      <path
        d="M4 12h16"
        className={twMerge(middleBarStyles, isOpen ? middleBarOpenStyles : middleBarClosedStyles)}
      />
      <path d="M4 17h16" className={twMerge(barStyles, timing, isOpen && bottomBarOpenStyles)} />
    </svg>
  );
}
