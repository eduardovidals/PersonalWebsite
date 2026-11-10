import { Button, composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { baseStyles, variantStyles } from './styles.js';
import type { VidalsButtonProps as Props } from './types.js';

/**
 * An accessible action. React Aria owns activation, focus and pending behavior.
 * @example
 * ```tsx
 * <VidalsButton type="submit">Send message</VidalsButton>
 * ```
 */
export function VidalsButton(props: Props) {
  const { variant = 'primary', className, ...rest } = props;

  return (
    <Button
      {...rest}
      className={composeRenderProps(className, (classes) =>
        twMerge(baseStyles, variantStyles[variant], classes),
      )}
    />
  );
}
