import type { Messages } from '@/i18n/types';

/** The site's main destinations, in header order, named in each language's `common.nav`. */
export const primaryLinks = [
  { key: 'work', href: '/projects/' },
  { key: 'about', href: '/about/' },
  { key: 'contact', href: '/#contact' },
] as const satisfies readonly { key: keyof Messages['common']['nav']; href: string }[];
