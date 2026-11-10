import { Home } from '@/features/Home';
import { homeMetadata } from '@/features/Home/metadata';

export function generateMetadata() {
  return homeMetadata('en');
}

export default function HomePage() {
  return <Home locale="en" />;
}
