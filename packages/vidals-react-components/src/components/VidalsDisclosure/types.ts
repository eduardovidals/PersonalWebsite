import type { ReactNode } from 'react';
import type { DisclosureProps } from 'react-aria-components';

/** The disclosure state a trigger can react to. */
export interface VidalsDisclosureState {
  /** Whether the panel is open. */
  isExpanded: boolean;
}

/** React Aria disclosure props with a text trigger and one panel. */
export interface VidalsDisclosureProps extends Omit<DisclosureProps, 'children' | 'className'> {
  /** The trigger button's content. A function can switch wording, such as "More tools" and "Fewer tools". */
  trigger: ReactNode | ((state: VidalsDisclosureState) => ReactNode);
  /** Content revealed while the disclosure is open. */
  children: ReactNode;
  /** Classes for the wrapper, which is a `group` so children can use `group-expanded:`. */
  className?: string;
  /** Classes for the trigger button. */
  triggerClassName?: string;
  /** Classes for the panel. */
  panelClassName?: string;
}
