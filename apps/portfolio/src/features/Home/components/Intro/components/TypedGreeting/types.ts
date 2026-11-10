export interface TypedGreetingProps {
  /** Accessible name of the animation group. */
  label: string;
  /** Roles typed in turn; the first is also the stable text for assistive technology. */
  roles: readonly string[];
  /** Accessible name of the pause control. */
  pauseLabel: string;
  /** Accessible name of the resume control. */
  resumeLabel: string;
}
