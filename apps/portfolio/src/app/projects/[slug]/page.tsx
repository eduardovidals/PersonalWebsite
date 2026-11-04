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
    <div className="mx-auto w-full max-w-[54rem] px-5 py-10 text-vidals-text sm:px-8 sm:py-16">
      <article>
        <header>
          <nav aria-label="Breadcrumb" className="text-sm">
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 text-vidals-accent underline-offset-4 hover:underline"
            >
              <Arrow back /> All projects
            </Link>
          </nav>
          <div className="mt-6 text-center">
            {project.logo && (
              <Image
                src={imagePath(project.logo)}
                alt=""
                width={mediaDimensions[project.logo][0]}
                height={mediaDimensions[project.logo][1]}
                unoptimized
                className="mx-auto mb-3 h-12 w-auto max-w-28 object-contain"
              />
            )}
            <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
            <p className="mx-auto mt-3 max-w-[56ch] text-lg leading-relaxed text-vidals-muted">
              {project.description}
            </p>
          </div>
        </header>
        <figure className="mt-6">
          <Cover project={project} detail />
        </figure>
        <aside aria-label="Project details" className="mt-4 rounded-md bg-vidals-surface px-4 py-3">
          <dl className="grid gap-x-6 gap-y-2 text-sm leading-relaxed sm:grid-cols-[auto_auto_1fr]">
            {[
              ['Project type', project.category],
              ['Context', project.context],
              ['Built with', project.stack.join(', ')],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="inline font-semibold sm:block">{label}: </dt>
                <dd className="inline text-vidals-muted sm:block">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
        <section aria-label="Case study" className="mt-7">
          <ArticleBody markdown={markdown} />
        </section>
      </article>
      <nav
        aria-label="More projects"
        className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-vidals-border pt-5"
      >
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm text-vidals-accent underline-offset-4 hover:underline"
        >
          <Arrow back /> All projects
        </Link>
        <Link
          href={projectHref(next.slug)}
          className="inline-flex items-center gap-2 text-sm text-vidals-accent underline-offset-4 hover:underline"
        >
          Next: {next.title} <Arrow />
        </Link>
      </nav>
    </div>
  );
}
