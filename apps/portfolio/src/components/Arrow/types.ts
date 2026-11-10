/** Which way the arrow points. */
export type ArrowDirection = 'right' | 'left' | 'down' | 'up-right';

export interface ArrowProps {
  /** Defaults to `right`. */
  direction?: ArrowDirection;
  /** Extra classes, such as a color or size. */
  className?: string;
}
