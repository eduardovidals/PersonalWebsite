import { notFound } from 'next/navigation';
import { projectSlugs } from '@/content/projects';
import { readStory } from '@/content/stories/read';
import { Project } from '@/features/Projects/Project';
import { projectForSlug, projectMetadata } from '@/features/Projects/metadata';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: ProjectPageProps) {
  return projectMetadata('en', (await props.params).slug);
}

export default async function ProjectPage(props: ProjectPageProps) {
  const project = projectForSlug((await props.params).slug) ?? notFound();
  // Resolve through the catalog before reading disk; only known slugs become paths.
  return <Project locale="en" project={project} markdown={await readStory('en', project.slug)} />;
}
