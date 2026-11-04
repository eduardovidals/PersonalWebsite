import type { Metadata } from 'next';
import Link from 'next/link';
import { CurrentWork } from '@/components/CurrentWork';
import { ToolChips } from '@/components/ToolChips';
import { projectHref, projects } from '@/content/projects';
import { Arrow, Cover } from './archive-parts';

const description =
  'Explore Eduardo’s independent Software Factory project, his professional work at PGIM and Prudential, and his early mobile apps and visual experiments.';

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects/' },
  openGraph: {
    type: 'website',
    title: 'Projects · Eduardo Vidals',
    description,
    url: '/projects/',
    images: ['/social-card.png'],
  },
};

export default function ProjectsPage() {
  const contexts = [...new Set(projects.map((project) => project.context))];
  return (
    <div className="shell py-12 text-vidals-text sm:py-20">
      <header>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Projects</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-vidals-muted">
          Tools for engineers, experiments from school, and a birthday gift for one person I love.
        </p>
        <nav
          aria-label="Project collections"
          className="mt-4 flex flex-wrap gap-x-5 text-sm font-semibold text-vidals-accent"
        >
          <a
            href="#current-work"
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            Independent
          </a>
          <a
            href="#professional-work"
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            At work
          </a>
          <a
            href="#early-work"
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            Archive
          </a>
        </nav>
      </header>
      <CurrentWork />
      {contexts.map((context, index) => (
        <section
          key={context}
          id={index === 0 ? 'early-work' : undefined}
          className="mt-12 sm:mt-16"
          aria-label={context}
        >
          <h2 className="mb-5 text-2xl font-semibold tracking-tight sm:mb-6">{context}</h2>
          {index === 0 && (
            <p className="mb-5 text-sm text-vidals-muted">Archived screens from my internship.</p>
          )}
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2">
            {projects
              .filter((project) => project.context === context)
              .map((project) => (
                <article key={project.slug} className="min-w-0">
                  <Link
                    href={projectHref(project.slug)}
                    className="group flex flex-col gap-3 rounded-2xl"
                    aria-labelledby={`project-${project.slug}`}
                  >
                    <div>
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
                    <Cover project={project} />
                  </Link>
                  <div className="mt-3">
                    <ToolChips
                      tools={project.stack}
                      label={`Tools used on ${project.title}`}
                      compact
                    />
                  </div>
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
