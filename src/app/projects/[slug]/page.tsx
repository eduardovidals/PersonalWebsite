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
import { Arrow, Cover, IndexLabel } from '../archive-parts';
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
    <div className="shell pb-16 text-ink sm:pb-24">
      <article>
        <header className="pt-12 sm:pt-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-3 text-sm text-muted"
          >
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
            >
              <Arrow back /> Project archive
            </Link>
          </nav>
          <div className="border-t border-line pt-6">
            <IndexLabel number={index + 1}>{project.category}</IndexLabel>
            <h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(2.9rem,7vw,6rem)] leading-[1.04] tracking-[-.06em]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[54ch] text-xl leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
        </header>
        <figure className="mt-8 sm:mt-12">
          <Cover project={project} detail />
        </figure>
        <div className="mt-10 grid gap-7 border-t border-line pt-8 md:mt-14 md:grid-cols-[minmax(10rem,1fr)_minmax(0,2.8fr)] md:gap-16">
          <aside aria-label="Project details" className="min-w-0">
            <div className="md:sticky md:top-24">
              <h2 className="font-mono text-xs font-medium tracking-widest text-muted uppercase">
                Project notes
              </h2>
              {project.logo && (
                <Image
                  src={imagePath(project.logo)}
                  alt=""
                  width={mediaDimensions[project.logo][0]}
                  height={mediaDimensions[project.logo][1]}
                  unoptimized
                  className="mt-5 h-14 w-24 object-contain object-left"
                />
              )}
              <dl className="mt-4 grid grid-cols-2 gap-6 text-sm md:block md:space-y-5">
                <div>
                  <dt className="text-muted">Context</dt>
                  <dd className="mt-1.5 font-medium">{project.context}</dd>
                </div>
                <div>
                  <dt className="text-muted">Built with</dt>
                  <dd className="mt-1.5 leading-relaxed">{project.stack.join(' · ')}</dd>
                </div>
              </dl>
            </div>
          </aside>
          <section
            aria-label="Case study"
            className="max-w-[72ch] min-w-0 border-t border-line pt-2 md:border-none md:pt-0 [&>div>p:first-child]:mt-0"
          >
            <ArticleBody markdown={markdown} />
          </section>
        </div>
      </article>
      <nav
        aria-label="More projects"
        className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8 md:mt-20"
      >
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
        >
          <Arrow back /> All projects
        </Link>
        <Link href={projectHref(next.slug)} className="group">
          <span className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase">
            Next case study
          </span>
          <span className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight underline-offset-4 group-hover:underline">
            {next.title}
            <Arrow />
          </span>
        </Link>
      </nav>
    </div>
  );
}
