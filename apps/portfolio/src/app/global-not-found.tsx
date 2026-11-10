import type { Metadata } from 'next';
import { RootDocument } from '@/components/RootDocument';
import { NotFound } from '@/features/NotFound';
import './globals.css';

export const metadata: Metadata = {
  title: 'Page Not Found | Eduardo Vidals',
  robots: { index: false, follow: true },
};

/** Unmatched URLs in any language; the site has one root layout per language, so this owns 404. */
export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <NotFound locale="en" />
    </RootDocument>
  );
}
