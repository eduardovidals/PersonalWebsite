import type { ReactNode } from 'react';
import { RootDocument } from '@/components/RootDocument';
import { rootMetadata } from '@/i18n/metadata';
import '../globals.css';

export function generateMetadata() {
  return rootMetadata('en');
}

/** English pages keep the site's original, unprefixed URLs. */
export default function EnglishLayout(props: Readonly<{ children: ReactNode }>) {
  return <RootDocument locale="en">{props.children}</RootDocument>;
}
