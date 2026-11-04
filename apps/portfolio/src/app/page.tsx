import type { Metadata } from 'next';
import { getPosts } from '@/content/blog';
import { HomeOverview } from './_components/HomeOverview/HomeOverview';

export const metadata: Metadata = {
  alternates: { canonical: '/', types: { 'application/rss+xml': '/feed.xml' } },
};

export default function HomePage() {
  return <HomeOverview notes={getPosts().slice(0, 2)} />;
}
