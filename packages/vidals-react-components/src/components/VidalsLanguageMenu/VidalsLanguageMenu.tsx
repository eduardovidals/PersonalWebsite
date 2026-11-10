import { Button, Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import {
  buttonStyles,
  currentItemStyles,
  itemStyles,
  menuStyles,
  popoverStyles,
} from './styles.js';
import type { VidalsLanguageMenuProps as Props } from './types.js';

/**
 * Lists the page in every available language. Each item is a link in its own language, so the
 * menu reads correctly to people who do not read the current one. React Aria owns the menu's
 * keyboard navigation, focus, dismissal and right-to-left placement.
 * @example
 * ```tsx
 * <VidalsLanguageMenu
 *   label="Language"
 *   currentId="en"
 *   options={[
 *     { id: 'en', label: 'English', href: '/' },
 *     { id: 'es', label: 'Español', href: '/es/' },
 *   ]}
 * />
 * ```
 */
export function VidalsLanguageMenu(props: Props) {
  const { options, currentId, label, onAction, className } = props;

  return (
    <MenuTrigger>
      {/* The name includes the visible code (WCAG 2.5.3), so voice users can say what they see. */}
      <Button data-ripple="" className={twMerge(buttonStyles, className)}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="size-4.5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
        </svg>
        <span className="sr-only">{label} </span>
        <span className="uppercase">{currentId}</span>
      </Button>
      <Popover placement="bottom end" offset={6} className={popoverStyles}>
        <Menu className={menuStyles} onAction={(key) => onAction?.(String(key))}>
          {options.map((option) => (
            <MenuItem
              key={option.id}
              id={option.id}
              href={option.href}
              hrefLang={option.id}
              lang={option.id}
              textValue={option.label}
              className={twMerge(itemStyles, option.id === currentId && currentItemStyles)}
            >
              {option.label}
              {option.id === currentId && <span aria-hidden="true">✓</span>}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
