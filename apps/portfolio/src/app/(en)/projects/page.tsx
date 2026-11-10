import { Projects } from '@/features/Projects';
import { projectsMetadata } from '@/features/Projects/metadata';

export function generateMetadata() {
  return projectsMetadata('en');
}

export default function ProjectsPage() {
  return <Projects locale="en" />;
}
