export interface VidalsBackToTopProps {
  /** How many viewport heights the reader scrolls before the control appears. Defaults to 1.5; 0 always shows it. */
  threshold?: number;
  /** Receives focus after returning to the top, so keyboard users continue from the start. */
  focusTargetId?: string;
  /** Accessible name. Defaults to "Back to top". */
  label?: string;
  /** Classes for the fixed wrapper, such as a different offset. */
  className?: string;
}
