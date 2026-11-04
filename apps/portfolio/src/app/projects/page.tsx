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
    <div className="shell py-10 text-vidals-text sm:py-16">
      <header className="grid items-end gap-5 border-b-4 border-vidals-text pb-6 md:grid-cols-[1.3fr_1fr] md:pb-9">
        <h1 className="text-[clamp(4.25rem,10vw,8.75rem)] leading-[.88] font-black tracking-[-.05em]">
          Projects
        </h1>
        <p className="max-w-[33ch] font-[Georgia,serif] text-xl leading-[1.3] italic sm:text-2xl">
          Apps I worked on at Smarttwigs, plus a few projects from my time studying algorithms and
          computer graphics.
        </p>
      </header>
      <section aria-label="All projects">
        {projects.map((project, index) => (
          <article key={project.slug} className="border-b border-vidals-text">
            <Link
              href={projectHref(project.slug)}
              className="group grid items-center gap-x-5 gap-y-4 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,.8fr)] sm:py-8 lg:gap-x-10"
              aria-labelledby={`project-${project.slug}`}
            >
              <span
                aria-hidden="true"
                className="self-start font-mono text-sm tabular-nums text-vidals-accent"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="mb-3 text-sm font-medium text-vidals-muted">{project.category}</p>
                <h2
                  className="text-[clamp(2.1rem,4.5vw,4.3rem)] leading-[.98] font-bold tracking-[-.055em] group-hover:text-vidals-accent"
                  id={`project-${project.slug}`}
                >
                  {project.title}
                </h2>
                <p className="mt-3 max-w-[42ch] leading-relaxed text-vidals-muted">
                  {project.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-vidals-accent underline decoration-1 underline-offset-4">
                  Read case study <Arrow />
                </span>
              </div>
              <Cover project={project} />
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
