import { Button, Disclosure, DisclosurePanel } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { panelStyles, rootStyles, triggerStyles } from './styles.js';
import type { VidalsDisclosureProps as Props } from './types.js';

/**
 * Shows and hides one panel from a trigger button. React Aria owns `aria-expanded`, the panel
 * relationship, keyboard activation and find-in-page reveal; the panel height animates unless the
 * reader prefers reduced motion.
 * @example
 * ```tsx
 * <VidalsDisclosure trigger={({ isExpanded }) => (isExpanded ? 'Fewer tools' : 'More tools')}>
 *   <p>Docker, Nx and Vitest</p>
 * </VidalsDisclosure>
 * ```
 */
export function VidalsDisclosure(props: Props) {
  const { trigger, children, className, triggerClassName, panelClassName, ...rest } = props;

  return (
    <Disclosure {...rest} className={twMerge(rootStyles, className)}>
      {({ isExpanded }) => (
        <>
          <Button slot="trigger" className={twMerge(triggerStyles, triggerClassName)}>
            {typeof trigger === 'function' ? trigger({ isExpanded }) : trigger}
          </Button>
          <DisclosurePanel data-noscript-open="" className={twMerge(panelStyles, panelClassName)}>
            {children}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
