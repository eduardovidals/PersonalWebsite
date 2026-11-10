'use client';

import { VidalsLink } from '@vidals/react-components';
import { usePathname } from 'next/navigation';
import { currentFor } from '../../currentLink';
import { linkStyles, navStyles } from './styles';
import type { PrimaryNavProps as Props } from './types';

/**
 * The header's primary links on tablets and desktops, with the current page marked.
 * @example
 * ```tsx
 * <PrimaryNav label="Primary" links={[{ label: 'Work', href: '/projects/' }]} />
 * ```
 */
export function PrimaryNav(props: Props) {
  const { label, links } = props;
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={navStyles}>
      {links.map((link) => (
        <VidalsLink
          key={link.href}
          variant="plain"
          href={link.href}
          aria-current={currentFor(pathname, link.href)}
          data-ripple=""
          className={linkStyles}
        >
          {link.label}
        </VidalsLink>
      ))}
    </nav>
  );
}
