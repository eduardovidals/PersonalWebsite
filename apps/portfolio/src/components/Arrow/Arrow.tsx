import { twMerge } from 'tailwind-merge';
import type { ArrowDirection, ArrowProps as Props } from './types';

const paths: Record<ArrowDirection, string> = {
  right: 'M2.5 10h15M11 4l6.5 6-6.5 6',
  left: 'M17.5 10h-15M9 4 2.5 10 9 16',
  down: 'M10 2.5v15M4 11l6 6.5 6-6.5',
  'up-right': 'M4.5 15.5 15.5 4.5M5 4.5h10.5V15',
};

// Horizontal arrows point the reading direction, so they mirror on right-to-left pages.
const directionStyles: Record<ArrowDirection, string> = {
  right: 'rtl:-scale-x-100',
  left: 'rtl:-scale-x-100',
  down: '',
  'up-right': 'rtl:-scale-x-100',
};

/**
 * A decorative arrow that follows a link's words; screen readers skip it. Horizontal arrows mirror
 * on right-to-left pages.
 * @example
 * ```tsx
 * <Arrow direction="left" />
 * ```
 */
export function Arrow(props: Props) {
  const { direction = 'right', className } = props;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={twMerge('size-[1.1em] shrink-0', directionStyles[direction], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
