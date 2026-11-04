import type { Metadata } from 'next';
import Link from 'next/link';
import { imagePath, projectHref, projects } from '@/content/projects';
import { Arrow, Cover } from './archive-parts';

const description =
  'Six case studies by Eduardo Vidals, from mobile and web products at Smarttwigs to interactive experiments in algorithms and computer graphics.';

export const metadata: Metadata = {
  title: 'Project archive',
  description,
  alternates: { canonical: '/projects/' },
  openGraph: {
    type: 'website',
    title: 'Project archive · Eduardo Vidals',
    description,
    url: '/projects/',
    images: [{ url: imagePath('props-ad-parents'), alt: projects[0].coverAlt }],
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 text-vidals-text sm:px-8 sm:py-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">My projects</h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-vidals-muted sm:text-lg">
          Apps I worked on at Smarttwigs, plus a few projects from my time studying algorithms and
          computer graphics.
        </p>
      </header>
      <section aria-label="All projects" className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className="min-w-0 rounded-lg bg-vidals-surface">
            <Link
              href={projectHref(project.slug)}
              className="group flex h-full flex-col rounded-lg"
              aria-labelledby={`project-${project.slug}`}
            >
              <Cover project={project} />
              <div className="flex flex-1 flex-col items-center p-5 text-center sm:p-6">
                <h2
                  className="text-xl font-bold group-hover:text-vidals-accent sm:text-2xl"
                  id={`project-${project.slug}`}
                >
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-vidals-muted">{project.category}</p>
                <p className="mt-3 mb-5 leading-relaxed text-vidals-text">{project.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 rounded-md bg-vidals-deep px-3 py-2 text-sm font-semibold text-vidals-accent">
                  Read more <Arrow />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </section>
      <Link
        href="/"
        className="mt-9 inline-flex items-center gap-2 text-sm text-vidals-accent underline-offset-4 hover:underline"
      >
        <Arrow back /> Back to home
      </Link>
    </div>
  );
}
