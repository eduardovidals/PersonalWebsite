import { Button, composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { baseStyles, variantStyles } from './styles.js';
import type { VidalsButtonProps } from './types.js';

/** An accessible action. React Aria owns activation, focus and pending behavior. */
export function VidalsButton({ variant = 'primary', className, ...props }: VidalsButtonProps) {
  return (
    <Button
      {...props}
      className={composeRenderProps(className, (classes) =>
        twMerge(baseStyles, variantStyles[variant], classes),
      )}
    />
  );
}
