import { readStory } from '@/content/stories/read';
import { About } from '@/features/About';
import { aboutMetadata } from '@/features/About/metadata';

export function generateMetadata() {
  return aboutMetadata('en');
}

export default async function AboutPage() {
  return <About locale="en" story={await readStory('en', 'about')} />;
}
