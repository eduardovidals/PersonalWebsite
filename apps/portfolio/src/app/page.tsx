import type { Metadata } from 'next';
import { getPosts } from '@/content/blog';
import { PersonalIntro } from '@/components/PersonalIntro';
import { HomeOverview } from './_components/HomeOverview/HomeOverview';
import { HomeSectionNav } from './_components/HomeSectionNav/HomeSectionNav';

export const metadata: Metadata = {
  alternates: { canonical: '/', types: { 'application/rss+xml': '/feed.xml' } },
};

export default function HomePage() {
  return (
    <>
      <PersonalIntro />
      <HomeSectionNav />
      <HomeOverview notes={getPosts().slice(0, 2)} />
    </>
  );
}
