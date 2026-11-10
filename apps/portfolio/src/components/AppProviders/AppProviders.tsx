'use client';

import { I18nProvider } from 'react-aria-components';
import { LinkRouter } from '@/components/LinkRouter';
import type { AppProvidersProps as Props } from './types';

/**
 * Client providers for every page, in dependency order: React Aria learns the page's language
 * (direction, collation, number and date formatting), then its links navigate through Next.
 * @example
 * ```tsx
 * <AppProviders locale="ar">{children}</AppProviders>
 * ```
 */
export function AppProviders(props: Props) {
  const { locale, children } = props;

  return (
    <I18nProvider locale={locale}>
      <LinkRouter>{children}</LinkRouter>
    </I18nProvider>
  );
}
