import Link from 'next/link';
import { currentWork } from '@/content/projects/current-work';
import { ToolChips } from '@/components/ToolChips';
import { WorkVisual } from '@/components/WorkVisual';

const professionalIds = new Set(['pgim-platform', 'design-system', 'peaq']);
const collections = [
  {
    id: 'current-work',
    title: 'Independent builds',
    works: currentWork.filter((work) => !professionalIds.has(work.id)),
  },
  {
    id: 'professional-work',
    title: 'At PGIM and Prudential',
    works: currentWork.filter((work) => professionalIds.has(work.id)),
  },
];

export function CurrentWork() {
  return collections.map(({ id, title, works }) => (
    <section key={id} id={id} aria-labelledby={id + '-heading'} className="mt-12 sm:mt-16">
      <h2 id={id + '-heading'} className="mb-5 text-2xl font-semibold tracking-tight sm:mb-6">
        {title}
      </h2>
      <div
        className={
          id === 'professional-work'
            ? 'grid items-start gap-x-7 gap-y-8 md:grid-cols-2 xl:grid-cols-3'
            : 'grid items-start gap-x-10 gap-y-8 md:grid-cols-2'
        }
      >
        {works.map((work) => (
          <article
            key={work.id}
            id={work.id}
            aria-labelledby={`work-${work.id}`}
            className="min-w-0"
          >
            <WorkVisual work={work} />
            <h3 id={`work-${work.id}`} className="mt-3 text-2xl font-semibold tracking-tight">
              {work.href ? (
                <Link
                  href={work.href}
                  className="rounded-sm text-vidals-accent underline underline-offset-4"
                >
                  {work.title}
                  <span aria-hidden="true"> ↗</span>
                </Link>
              ) : (
                work.title
              )}
            </h3>
            <p className="mt-2 mb-4 max-w-[54ch] text-sm leading-relaxed text-vidals-muted">
              {work.description}
            </p>
            <details>
              <summary className="w-fit cursor-pointer rounded-sm py-2 text-sm font-medium text-vidals-accent underline-offset-4 hover:underline">
                Tools and development notes
              </summary>
              <ToolChips label={`Tools used on ${work.title}`} tools={work.stack} compact />
              {work.ai?.map(({ kind, tools, note }) => (
                <div key={kind} className="mt-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-xs font-medium text-vidals-accent">{kind}</span>
                    <ToolChips tools={tools} label={`${kind} on ${work.title}`} compact />
                  </div>
                  <p className="mt-1.5 max-w-[57ch] text-sm leading-relaxed text-vidals-muted">
                    {note}
                  </p>
                </div>
              ))}
            </details>
          </article>
        ))}
      </div>
    </section>
  ));
}
