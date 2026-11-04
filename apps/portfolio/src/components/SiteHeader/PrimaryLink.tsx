'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

export function PrimaryLink(props: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const destination = props.href.replace(/\/$/, '') || '/';
  const current =
    pathname === destination
      ? 'page'
      : destination !== '/' && pathname.startsWith(destination + '/')
        ? 'location'
        : undefined;
  return <Link {...props} aria-current={current} />;
}
