import type { ComponentPropsWithRef } from 'react';
import type { Button } from 'react-aria-components';

export interface VidalsIconButtonProps extends Omit<
  ComponentPropsWithRef<typeof Button>,
  'aria-label'
> {
  /** Icon-only controls must say what they do. */
  'aria-label': string;
}
