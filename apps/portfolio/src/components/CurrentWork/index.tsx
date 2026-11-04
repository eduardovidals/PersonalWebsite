import Link from 'next/link';
import { currentWork } from '@/content/projects/current-work';
import { ToolChips } from '@/components/ToolChips';
import { WorkVisual } from '@/components/WorkVisual';

const professionalOrder = ['peaq', 'design-system', 'pgim-platform'];
const collections = [
  {
    id: 'professional-work',
    works: currentWork
      .filter((work) => professionalOrder.includes(work.id))
      .sort((a, b) => professionalOrder.indexOf(a.id) - professionalOrder.indexOf(b.id)),
  },
  {
    id: 'current-work',
    works: currentWork.filter((work) => !professionalOrder.includes(work.id)),
  },
];

export function CurrentWork() {
  return collections.map(({ id, works }) => (
    <div key={id} id={id} className="mt-12 sm:mt-16">
      <div
        id={id + '-heading'}
        className={
          id === 'professional-work'
            ? 'grid items-start gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-3'
            : 'grid items-start gap-x-10 gap-y-12 sm:grid-cols-2'
        }
      >
        {works.map((work) => (
          <article
            key={work.id}
            id={work.id}
            aria-labelledby={`work-${work.id}`}
            className={
              work.visual.kind === 'planned'
                ? 'min-w-0 rounded-2xl bg-vidals-deep p-5 sm:col-span-2 sm:p-7'
                : 'min-w-0 border-t border-vidals-border/25 pt-5'
            }
          >
            <h2
              id={`work-${work.id}`}
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
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
            </h2>
            {work.visual.kind === 'planned' && (
              <p className="mt-1 text-sm font-medium text-vidals-accent">{work.visual.status}</p>
            )}
            <p className="mt-2 mb-4 max-w-[58ch] text-base leading-relaxed text-vidals-muted">
              {work.description}
            </p>
            <WorkVisual work={work} />
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
    </div>
  ));
}
