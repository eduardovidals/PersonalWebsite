import type { Metadata } from 'next';
import Link from 'next/link';
import { imagePath, projectHref, projects } from '@/content/projects';
import { Arrow, Cover, IndexLabel } from './archive-parts';

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
    <div className="shell pb-20 text-ink md:pb-28">
      <header className="border-b border-line pt-12 pb-9 sm:pt-20 sm:pb-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap items-center gap-3 text-sm text-muted"
        >
          <Link href="/" className="underline-offset-4 hover:underline">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-ink">
            Projects
          </span>
        </nav>
        <div className="grid items-end gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <IndexLabel>Engineering portfolio</IndexLabel>
            <h1 className="mt-4 font-serif text-6xl leading-none tracking-[-.06em] sm:text-7xl lg:text-8xl">
              Project archive<span className="text-accent">.</span>
            </h1>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-muted">
            Six builds, in my own words. A closer look at the interfaces, algorithms, and
            experiments behind the work.
          </p>
        </div>
      </header>
      <section
        aria-label="All projects"
        className="grid gap-x-8 gap-y-12 pt-9 md:grid-cols-2 md:gap-y-16 lg:pt-12"
      >
        {projects.map((project, index) => (
          <article key={project.slug} className="min-w-0">
            <Link
              href={projectHref(project.slug)}
              className="group block"
              aria-labelledby={`project-${project.slug}`}
            >
              <div className="mb-3 flex items-center justify-between gap-2 text-muted">
                <IndexLabel number={index + 1}>{project.category}</IndexLabel>
              </div>
              <Cover project={project} />
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h2
                  className="font-serif text-3xl tracking-tight underline-offset-4 group-hover:underline sm:text-4xl"
                  id={`project-${project.slug}`}
                >
                  {project.title}
                </h2>
                <span className="shrink-0 text-accent">
                  <Arrow />
                </span>
              </div>
              <p className="mt-2 max-w-[50ch] leading-relaxed text-muted">{project.description}</p>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
