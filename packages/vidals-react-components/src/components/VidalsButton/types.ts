import type { ComponentPropsWithRef } from 'react';
import type { Button } from 'react-aria-components';

/** Visual emphasis only; both variants preserve native button semantics. */
export type VidalsButtonVariant = 'primary' | 'subtle';

export interface VidalsButtonProps extends ComponentPropsWithRef<typeof Button> {
  /** Use subtle for supporting actions. Defaults to primary. */
  variant?: VidalsButtonVariant;
}
