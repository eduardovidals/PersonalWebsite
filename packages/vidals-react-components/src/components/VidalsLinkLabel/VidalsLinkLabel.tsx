import { twMerge } from 'tailwind-merge';
import type { VidalsLinkLabelProps as Props } from './types.js';

/**
 * The words of a standalone link: a short accent underline that grows across the label when the
 * surrounding link or button is hovered or keyboard-focused. Keep arrows outside it.
 * @example
 * ```tsx
 * <VidalsLink href="/about/" variant="plain">
 *   <VidalsLinkLabel>My story</VidalsLinkLabel> →
 * </VidalsLink>
 * ```
 */
export function VidalsLinkLabel(props: Props) {
  const { className, ...rest } = props;

  return <span {...rest} className={twMerge('link-grow', className)} />;
}
