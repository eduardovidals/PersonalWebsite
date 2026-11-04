import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  imagePath,
  mediaDimensions,
  projectHref,
  projects,
  projectSlugs,
} from '@/content/projects';
import { Arrow, Cover } from '../archive-parts';
import { ArticleBody } from './article-body';

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

function resolveProject(slug: string) {
  return projects.find((item) => item.slug === slug) ?? notFound();
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = resolveProject((await params).slug);
  const url = projectHref(project.slug);
  const [width, height] = mediaDimensions[project.cover];
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    authors: [{ name: 'Eduardo Vidals' }],
    openGraph: {
      type: 'article',
      title: `${project.title} · Eduardo Vidals`,
      description: project.description,
      url,
      images: [{ url: imagePath(project.cover), alt: project.coverAlt, width, height }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = resolveProject((await params).slug);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  // Resolve through the catalog before accessing disk; only known slugs become paths.
  const markdown = await readFile(
    path.join(process.cwd(), 'src', 'content', 'projects', `${project.slug}.md`),
    'utf8',
  );

  return (
    <div className="shell py-9 text-vidals-text sm:py-14">
      <article>
        <header>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-between gap-4 border-b border-vidals-text pb-3 text-sm"
          >
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 text-vidals-accent underline-offset-4 hover:underline"
            >
              <Arrow back /> All projects
            </Link>
            <span className="font-mono text-vidals-muted">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </nav>
          <div className="grid items-end gap-5 py-7 md:grid-cols-[minmax(0,1.3fr)_minmax(0,.85fr)] md:gap-10 md:py-12">
            <h1 className="text-balance text-[clamp(2.8rem,7vw,6.2rem)] leading-[.95] font-black tracking-[-.045em]">
              {project.title}
            </h1>
            <p className="max-w-[37ch] font-[Georgia,serif] text-xl leading-[1.3] italic sm:text-2xl">
              {project.description}
            </p>
          </div>
        </header>
        <figure>
          <Cover project={project} detail />
        </figure>
        <div className="mt-7 grid items-start gap-x-10 gap-y-7 border-t-2 border-vidals-text pt-5 md:mt-10 md:grid-cols-[minmax(8rem,1fr)_minmax(0,3fr)] md:pt-8">
          <aside aria-label="Project details">
            {project.logo && (
              <Image
                src={imagePath(project.logo)}
                alt=""
                width={mediaDimensions[project.logo][0]}
                height={mediaDimensions[project.logo][1]}
                unoptimized
                className="mb-4 h-12 w-auto max-w-28 object-contain"
              />
            )}
            <dl className="grid gap-x-6 gap-y-3 text-sm leading-relaxed sm:grid-cols-3 md:grid-cols-1 md:gap-y-5">
              {[
                ['Project type', project.category],
                ['Context', project.context],
                ['Built with', project.stack.join(', ')],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-semibold">{label}</dt>
                  <dd className="text-vidals-muted">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <section aria-label="Case study" className="min-w-0 max-w-[68ch]">
            <ArticleBody markdown={markdown} />
          </section>
        </div>
      </article>
      <nav
        aria-label="More projects"
        className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t-2 border-vidals-text pt-4"
      >
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm text-vidals-accent underline-offset-4 hover:underline"
        >
          <Arrow back /> All projects
        </Link>
        <Link
          href={projectHref(next.slug)}
          className="inline-flex items-center gap-2 font-[Georgia,serif] text-2xl italic text-vidals-accent underline-offset-4 hover:underline"
        >
          Next: {next.title} <Arrow />
        </Link>
      </nav>
    </div>
  );
}
