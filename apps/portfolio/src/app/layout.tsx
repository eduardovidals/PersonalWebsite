import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { author, siteUrl } from '@/config/site';
import { isDeployPreview } from '@/config/server';
import { SiteHeader } from '@/components/SiteHeader/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter/SiteFooter';
import './globals.css';

const title = 'Eduardo Vidals — Full-Stack Software Engineer';
const description =
  'Eduardo Vidals works on accessible design systems at Prudential Financial. Explore his full-stack work at PGIM and his independent project, Software Factory.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s — Eduardo Vidals' },
  description,
  authors: [{ name: author }],
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    type: 'website',
    siteName: author,
    title,
    description,
    images: ['/social-card.png'],
  },
  twitter: { card: 'summary_large_image' },
  robots: isDeployPreview ? { index: false, follow: false } : undefined,
};

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          className="sr-only bg-vidals-background px-4 py-2 font-bold focus:not-sr-only focus:absolute focus:z-50"
          href="#main-content"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {props.children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
