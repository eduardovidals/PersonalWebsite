import { Button, composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { iconButtonStyles } from './styles.js';
import type { VidalsIconButtonProps as Props } from './types.js';

/**
 * A round, icon-only action with a press ripple. React Aria owns activation and focus.
 * @example
 * ```tsx
 * <VidalsIconButton aria-label="Back to top" onPress={scrollUp}>
 *   <svg aria-hidden="true" />
 * </VidalsIconButton>
 * ```
 */
export function VidalsIconButton(props: Props) {
  const { className, ...rest } = props;

  return (
    <Button
      data-ripple=""
      {...rest}
      className={composeRenderProps(className, (classes) => twMerge(iconButtonStyles, classes))}
    />
  );
}
