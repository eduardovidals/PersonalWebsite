import type { Metadata } from 'next';
import Link from 'next/link';
import { imagePath, projectHref, projects } from '@/content/projects';
import { Arrow, Cover } from './archive-parts';

const description =
  'Six case studies by Eduardo Vidals, from mobile and web products at Smarttwigs to interactive experiments in algorithms and computer graphics.';

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects/' },
  openGraph: {
    type: 'website',
    title: 'Projects · Eduardo Vidals',
    description,
    url: '/projects/',
    images: [{ url: imagePath('props-ad-parents'), alt: projects[0].coverAlt }],
  },
};

export default function ProjectsPage() {
  const contexts = [...new Set(projects.map((project) => project.context))];
  return (
    <div className="shell py-12 text-vidals-text sm:py-20">
      <header>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Projects</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-vidals-muted">
          Apps I worked on at Smarttwigs, plus a few projects from my time studying algorithms and
          computer graphics.
        </p>
      </header>
      {contexts.map((context) => (
        <section key={context} className="mt-12 sm:mt-16" aria-label={context}>
          <h2 className="mb-5 text-2xl font-semibold tracking-tight sm:mb-6">{context}</h2>
          <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2">
            {projects
              .filter((project) => project.context === context)
              .map((project) => (
                <article key={project.slug} className="min-w-0">
                  <Link
                    href={projectHref(project.slug)}
                    className="group block rounded-2xl"
                    aria-labelledby={`project-${project.slug}`}
                  >
                    <Cover project={project} />
                    <div className="pt-4">
                      <p className="text-sm font-medium text-vidals-accent">{project.category}</p>
                      <h3
                        className="mt-1 flex items-center gap-3 text-2xl font-semibold tracking-tight group-hover:text-vidals-accent sm:text-3xl"
                        id={`project-${project.slug}`}
                      >
                        {project.title}{' '}
                        <span className="shrink-0 text-base text-vidals-accent">
                          <Arrow />
                        </span>
                      </h3>
                      <p className="mt-2 max-w-[48ch] leading-relaxed text-vidals-muted">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      ))}
      <Link
        href="/"
        className="mt-9 inline-flex items-center gap-2 text-sm text-vidals-accent underline-offset-4 hover:underline"
      >
        <Arrow back /> Back to home
      </Link>
    </div>
  );
}
