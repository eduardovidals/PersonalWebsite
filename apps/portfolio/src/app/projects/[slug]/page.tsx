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
    <div className="mx-auto w-full max-w-5xl px-5 py-10 text-vidals-text sm:px-8 sm:py-16">
      <article>
        <header>
          <nav aria-label="Breadcrumb" className="text-sm font-medium">
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 text-vidals-accent underline-offset-4 hover:underline"
            >
              <Arrow back /> All projects
            </Link>
          </nav>
          <div className="mx-auto max-w-3xl py-8 sm:py-12 sm:text-center">
            <p className="text-sm font-semibold text-vidals-accent">{project.category}</p>
            <h1 className="mt-3 text-balance text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-vidals-muted sm:mx-auto sm:text-xl">
              {project.description}
            </p>
          </div>
        </header>
        <figure>
          <Cover project={project} detail />
        </figure>
        <div className="mx-auto mt-6 max-w-[70ch] sm:mt-9">
          <aside
            aria-label="Project details"
            className="flex flex-wrap items-center gap-x-7 gap-y-4 rounded-2xl bg-vidals-surface px-5 py-4 sm:px-6"
          >
            {project.logo && (
              <Image
                src={imagePath(project.logo)}
                alt=""
                width={mediaDimensions[project.logo][0]}
                height={mediaDimensions[project.logo][1]}
                unoptimized
                className="h-12 w-auto max-w-24 rounded-lg object-contain"
              />
            )}
            <dl className="grid flex-1 gap-x-6 gap-y-3 text-sm leading-relaxed sm:grid-cols-[1fr_1.6fr]">
              {[
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
          <section aria-label="Case study" className="mt-9 min-w-0">
            <ArticleBody markdown={markdown} />
          </section>
        </div>
      </article>
      <nav
        aria-label="More projects"
        className="mx-auto mt-12 flex max-w-[70ch] flex-wrap items-center justify-between gap-4 rounded-2xl bg-vidals-surface p-5"
      >
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm text-vidals-accent underline-offset-4 hover:underline"
        >
          <Arrow back /> All projects
        </Link>
        <Link
          href={projectHref(next.slug)}
          className="inline-flex items-center gap-2 font-semibold text-vidals-accent underline-offset-4 hover:underline"
        >
          Next: {next.title} <Arrow />
        </Link>
      </nav>
    </div>
  );
}
