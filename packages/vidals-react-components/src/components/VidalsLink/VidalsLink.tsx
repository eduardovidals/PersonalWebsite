import { composeRenderProps, Link } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { baseStyles, variantStyles } from './styles.js';
import type { VidalsLinkProps as Props } from './types.js';

/**
 * Navigation on React Aria's `Link`. Press, hover and keyboard focus behave the same with a mouse,
 * touch and keyboard, and the app's `RouterProvider` decides how same-site paths navigate. Calls to
 * action opt into the press ripple.
 * @example
 * ```tsx
 * <VidalsLink href="/projects/" variant="primary">
 *   All projects
 * </VidalsLink>
 * ```
 */
export function VidalsLink(props: Props) {
  const { variant = 'inline', className, ...rest } = props;
  const callToAction = variant === 'primary' || variant === 'secondary';

  return (
    <Link
      data-ripple={callToAction ? '' : undefined}
      {...rest}
      className={composeRenderProps(className, (classes) =>
        twMerge(baseStyles, variantStyles[variant], classes),
      )}
    />
  );
}
