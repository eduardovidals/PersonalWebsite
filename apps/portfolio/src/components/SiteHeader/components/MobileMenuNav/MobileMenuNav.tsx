'use client';

import { VidalsMobileMenu } from '@vidals/react-components';
import { usePathname } from 'next/navigation';
import { profiles } from '@/config/site';
import { currentFor } from '../../currentLink';
import type { MobileMenuNavProps as Props } from './types';

/**
 * The site's phone menu: the library menu with the current page marked and profiles below.
 * @example
 * ```tsx
 * <MobileMenuNav links={links} labels={labels} />
 * ```
 */
export function MobileMenuNav(props: Props) {
  const { links, labels } = props;
  const pathname = usePathname();

  return (
    <VidalsMobileMenu
      className="sm:hidden"
      label={labels.dialog}
      openLabel={labels.open}
      closeLabel={labels.close}
      navigationLabel={labels.navigation}
      items={links.map((link) => ({ ...link, current: currentFor(pathname, link.href) }))}
      secondaryItems={Object.entries(profiles).map(([label, href]) => ({ label, href }))}
    />
  );
}
