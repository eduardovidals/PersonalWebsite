import { readStory } from '@/content/stories/read';
import { Velton } from '@/features/Projects/Velton';
import { veltonMetadata } from '@/features/Projects/metadata';

export function generateMetadata() {
  return veltonMetadata('en');
}

export default async function VeltonPage() {
  return <Velton locale="en" story={await readStory('en', 'velton')} />;
}
