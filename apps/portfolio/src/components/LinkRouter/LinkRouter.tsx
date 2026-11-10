'use client';

import { useRouter } from 'next/navigation';
import { RouterProvider } from 'react-aria-components';
import { destinationFor, jumpToFragment, scrollToTop } from './navigation';
import type { LinkRouterProps as Props } from './types';

/**
 * Sends same-site React Aria links through Next's router, so pages change without a full reload.
 * React Aria leaves external, `mailto:`, new-tab and modified clicks to the browser; a link to the
 * current page scrolls to its top, and a fragment on this page uses the browser's own jump.
 * @example
 * ```tsx
 * <LinkRouter>
 *   <VidalsLink href="/projects/">Projects</VidalsLink>
 * </LinkRouter>
 * ```
 */
export function LinkRouter(props: Props) {
  const { children } = props;
  const router = useRouter();

  const navigate = (href: string) => {
    const destination = destinationFor(href, window.location);
    if (destination.kind === 'top') scrollToTop();
    else if (destination.kind === 'fragment') jumpToFragment(destination.href);
    else router.push(destination.path);
  };

  return <RouterProvider navigate={navigate}>{children}</RouterProvider>;
}
