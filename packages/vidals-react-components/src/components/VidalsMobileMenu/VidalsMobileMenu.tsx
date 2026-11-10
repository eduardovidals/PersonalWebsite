import { useRef, useState } from 'react';
import { Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components';
import { VidalsIconButton } from '../VidalsIconButton/index.js';
import { VidalsLink } from '../VidalsLink/index.js';
import { VidalsMenuIcon } from '../VidalsMenuIcon/index.js';
import {
  dialogStyles,
  itemStyles,
  modalStyles,
  overlayStyles,
  secondaryItemStyles,
  secondaryListStyles,
} from './styles.js';
import type { MenuRowStyle, VidalsMobileMenuProps as Props } from './types.js';

function rowStyle(index: number): MenuRowStyle {
  return { '--menu-item': index };
}

/**
 * Phone navigation pinned under a sticky header in a React Aria modal. Escape, outside press, scroll
 * locking, focus containment and focus return to the menu button come from React Aria; pressing a
 * link closes the menu.
 * @example
 * ```tsx
 * <VidalsMobileMenu
 *   items={[{ label: 'Work', href: '/projects/', current: 'page' }]}
 *   secondaryItems={[{ label: 'GitHub', href: 'https://github.com/' }]}
 * />
 * ```
 */
export function VidalsMobileMenu(props: Props) {
  const {
    items,
    secondaryItems = [],
    topOffset = 'var(--site-header-height, 4.5rem)',
    label = 'Site navigation',
    openLabel = 'Open menu',
    closeLabel = 'Close menu',
    navigationLabel = 'Mobile',
    className,
  } = props;
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  return (
    <div ref={root} className={className}>
      <DialogTrigger isOpen={open} onOpenChange={setOpen}>
        <VidalsIconButton aria-label={open ? closeLabel : openLabel}>
          <VidalsMenuIcon isOpen={open} />
        </VidalsIconButton>
        <ModalOverlay
          isDismissable
          shouldCloseOnInteractOutside={(element) => !root.current?.contains(element)}
          style={{ top: topOffset }}
          className={overlayStyles}
        >
          <Modal className={modalStyles}>
            <Dialog aria-label={label} className={dialogStyles}>
              <nav aria-label={navigationLabel}>
                <ul className="grid">
                  {items.map((item, index) => (
                    <li key={item.href} className="menu-item" style={rowStyle(index)}>
                      <VidalsLink
                        variant="plain"
                        href={item.href}
                        aria-current={item.current}
                        onPress={close}
                        data-ripple=""
                        className={itemStyles}
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-base text-vidals-accent">
                          →
                        </span>
                      </VidalsLink>
                    </li>
                  ))}
                </ul>
                {secondaryItems.length > 0 && (
                  <div className={secondaryListStyles} style={rowStyle(items.length)}>
                    {secondaryItems.map((item) => (
                      <VidalsLink
                        key={item.href}
                        variant="plain"
                        href={item.href}
                        onPress={close}
                        className={secondaryItemStyles}
                      >
                        {item.label} <span aria-hidden="true">↗</span>
                      </VidalsLink>
                    ))}
                  </div>
                )}
              </nav>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
