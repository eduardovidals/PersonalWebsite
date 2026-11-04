import Image from 'next/image';
import Link from 'next/link';
import { imagePath, projectHref, projects, type Project } from '@/content/projects';
import { Arrow } from '../Arrow/Arrow';

function SortPrint() {
  const input = [7, 3, 9, 2, 6, 8, 4, 1, 5];
  return (
    <svg aria-hidden="true" viewBox="0 0 520 252" className="block h-full w-full bg-[#dfcd98]">
      <defs>
        <pattern id="sort-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0H0v14" stroke="#756f54" strokeWidth=".6" fill="none" opacity=".31" />
        </pattern>
        <pattern id="sort-lines" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M-1 1l2-2m-2 7 7-7m-2 7 2-2" stroke="#cae0cc" strokeWidth=".7" opacity=".45" />
        </pattern>
      </defs>
      <rect width="520" height="252" fill="url(#sort-grid)" />
      <g fill="#343e38" fontFamily="monospace" fontSize="8.5" letterSpacing=".8">
        <text x="20" y="22">
          STUDY 02 / SORT
        </text>
        <text x="500" y="22" textAnchor="end">
          N = 09
        </text>
      </g>
      <path d="M28 198h191m82 0h191" stroke="#384b40" strokeWidth="1.4" />
      {[input, [...input].sort((a, b) => a - b)].map((series, p) => (
        <g key={p}>
          {series.map((value, i) => {
            const x = (p ? 304 : 31) + i * 20.5,
              h = value * 14.7;
            return (
              <g key={value}>
                <rect
                  x={x}
                  y={197 - h}
                  width="15.5"
                  height={h}
                  fill={value === 6 ? '#ac492a' : '#324e49'}
                />
                <rect x={x} y={197 - h} width="15.5" height={h} fill="url(#sort-lines)" />
              </g>
            );
          })}
          <text
            x={p ? 302 : 28}
            y="220"
            fontFamily="monospace"
            fontSize="9.5"
            letterSpacing="1.2"
            fill="#364338"
          >
            {p ? 'SORTED' : 'INPUT'}
          </text>
        </g>
      ))}
      <g transform="translate(260 137)" fill="none" stroke="#514f3c" strokeWidth="1.15">
        <circle r="17" />
        <path d="M-7 0H7m-6-6 6 6-6 6" />
      </g>
    </svg>
  );
}

function ProductPrint() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-[#ccdad7]"
      style={{
        backgroundImage: 'radial-gradient(#718987 0.65px, transparent 0.85px)',
        backgroundSize: '9px 9px',
      }}
    >
      <div className="absolute inset-x-[4%] top-[4.5%] flex justify-between font-mono text-[clamp(8px,.72vw,10px)] tracking-[.06em] text-[#2f4548]">
        <span>STUDY 03 / INTERFACE</span>
        <span>WEB APP</span>
      </div>
      <div className="absolute top-[16%] left-[11%] w-[78%] -rotate-2 border border-[#657f7e] bg-[#f6f3e9] shadow-[6px_7px_0_#678481]">
        <div className="flex h-4 items-center gap-1 border-b border-[#8c9c98] px-2 sm:h-5">
          <span className="size-1 rounded-full bg-[#637e79]" />
          <span className="size-1 rounded-full border border-[#637e79]" />
          <span className="size-1 rounded-full border border-[#637e79]" />
        </div>
        <Image
          unoptimized
          src={imagePath('benev-checkout')}
          alt=""
          width={1440}
          height={807}
          sizes="(min-width: 64rem) 440px, (min-width: 40rem) 38vw, 78vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

function Feature({ project, kind }: { project: Project; kind: 'sort' | 'product' }) {
  return (
    <Link href={projectHref(project.slug)} className="group block min-w-0">
      <div className="relative aspect-[520/252] overflow-hidden">
        {kind === 'sort' ? <SortPrint /> : <ProductPrint />}
      </div>
      <div className="pt-4 sm:pt-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[.09em] text-muted">
          {project.category} <span aria-hidden="true">/</span> {project.context}
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <h3 className="text-[clamp(1.65rem,2.5vw,2.2rem)] leading-tight font-semibold tracking-[-.052em] group-hover:underline decoration-1 underline-offset-[.14em]">
            {project.title}
          </h3>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-base group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <Arrow direction="up-right" />
          </span>
        </div>
        <p className="mt-1.5 max-w-[54ch] text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export function ProjectShelf() {
  const featuredSlugs = ['sorting-visualizer', 'benev'];
  const others = projects.filter((project) => !featuredSlugs.includes(project.slug));
  return (
    <>
      <div className="grid gap-x-7 gap-y-9 sm:grid-cols-2 lg:gap-x-9">
        {featuredSlugs.map((slug) => {
          const project = projects.find((item) => item.slug === slug);
          return project ? (
            <Feature key={slug} project={project} kind={slug === 'benev' ? 'product' : 'sort'} />
          ) : null;
        })}
      </div>
      <div className="mt-9 grid sm:grid-cols-2 sm:gap-x-7 lg:mt-12 lg:gap-x-9">
        {others.map((project) => (
          <Link
            key={project.slug}
            href={projectHref(project.slug)}
            className="group flex min-h-20 min-w-0 items-center gap-3 border-t border-line py-3.5 sm:gap-4"
          >
            <div className="relative aspect-[1.45] w-16 shrink-0 overflow-hidden border border-line/60 bg-mist">
              <Image
                unoptimized
                fill
                sizes="64px"
                src={imagePath(project.cover)}
                alt=""
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[17px] leading-tight font-semibold tracking-[-.035em] group-hover:underline decoration-1 underline-offset-4">
                {project.title}
              </h3>
              <span className="mt-1 block font-mono text-[10px] tracking-[.02em] text-muted">
                {project.stack.slice(0, 2).join(' / ')}
              </span>
            </div>
            <Arrow direction="up-right" className="text-muted group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </>
  );
}
