'use client';

import { VidalsLanguageMenu } from '@vidals/react-components';
import { usePathname } from 'next/navigation';
import { isLocaleId, localeIds, locales } from '@/i18n/locales';
import { localizedPath, splitLocale } from '@/i18n/paths';
import { rememberLanguage } from '@/i18n/preference';
import type { LanguageNavProps as Props } from './types';

/**
 * Offers the current page in every supported language and remembers the choice for the next visit
 * to the homepage.
 * @example
 * ```tsx
 * <LanguageNav label="Language" />
 * ```
 */
export function LanguageNav(props: Props) {
  const { label } = props;
  const { locale, path } = splitLocale(usePathname());

  return (
    <VidalsLanguageMenu
      label={label}
      currentId={locales[locale].id}
      options={localeIds.map((id) => ({
        id: locales[id].id,
        label: locales[id].label,
        href: localizedPath(id, path),
      }))}
      onAction={(id) => isLocaleId(id) && rememberLanguage(id)}
    />
  );
}
