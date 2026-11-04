import type { Metadata } from 'next';
import Link from 'next/link';
import { CurrentWorkCard } from '@/components/CurrentWork';
import { ToolChips } from '@/components/ToolChips';
import { projectHref, projects, type Project } from '@/content/projects';
import { currentWork } from '@/content/projects/current-work';
import { Arrow, Cover } from './archive-parts';
import { ProjectGallery } from './project-gallery';

const description =
  'PEAQ for Prudential Retirement Strategies, DX at Prudential, PInnacle at PGIM, and Eduardo’s independent projects.';

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

function EarlyProjectCard({ project }: Readonly<{ project: Project }>) {
  return (
    <article id={project.slug} aria-labelledby={`project-${project.slug}`} className="min-w-0">
      <Link
        id={project.slug === 'props' ? 'early-work' : undefined}
        href={projectHref(project.slug)}
        className="group flex flex-col gap-3 rounded-2xl"
        aria-labelledby={`project-${project.slug}`}
      >
        <div>
          <h2
            className="flex items-center gap-3 text-2xl font-semibold tracking-tight group-hover:text-vidals-accent sm:text-3xl"
            id={`project-${project.slug}`}
          >
            {project.title}{' '}
            <span className="shrink-0 text-base text-vidals-accent">
              <Arrow />
            </span>
          </h2>
          <p className="mt-1 text-sm font-medium text-vidals-accent">{project.context}</p>
          <p className="mt-2 max-w-[48ch] leading-relaxed text-vidals-muted">{project.caption}</p>
        </div>
        <Cover project={project} />
      </Link>
      <div className="mt-3">
        <ToolChips tools={project.stack} label={`Tools used on ${project.title}`} compact />
      </div>
    </article>
  );
}

// Lead with the newest employer work; keep all other projects in their published order.
const employerOrder = ['peaq', 'design-system', 'pgim-platform'];
function galleryRank(id: string) {
  const rank = employerOrder.indexOf(id);
  return rank < 0 ? employerOrder.length : rank;
}
const orderedWork = [...currentWork].sort((a, b) => galleryRank(a.id) - galleryRank(b.id));

export default function ProjectsPage() {
  const entries = [
    ...orderedWork.map((work) => ({
      id: work.id,
      kind: work.kind,
      card: <CurrentWorkCard work={work} />,
    })),
    ...projects.map((project) => ({
      id: project.slug,
      kind: project.kind,
      card: <EarlyProjectCard project={project} />,
    })),
  ];
  return (
    <div className="shell py-12 text-vidals-text sm:py-20">
      <header>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Projects</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-vidals-muted">
          My current project is PEAQ, a structured settlements app for Prudential Retirement
          Strategies.
        </p>
      </header>
      <ProjectGallery entries={entries} />
      <Link
        href="/"
        className="mt-9 inline-flex items-center gap-2 text-sm text-vidals-accent underline-offset-4 hover:underline"
      >
        <Arrow back /> Back to home
      </Link>
    </div>
  );
}
