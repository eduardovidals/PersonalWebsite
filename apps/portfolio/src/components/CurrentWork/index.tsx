import { currentWork } from '@/content/projects/current-work';
import { ToolChips } from '@/components/ToolChips';

export function CurrentWork() {
  return (
    <section id="current-work" aria-labelledby="current-work-heading" className="mt-12 sm:mt-16">
      <h2 id="current-work-heading" className="mb-5 text-2xl font-semibold tracking-tight sm:mb-6">
        Recent work
      </h2>
      <div className="grid items-start gap-x-10 gap-y-8 md:grid-cols-2">
        {currentWork.map((work) => (
          <article
            key={work.id}
            id={work.id}
            aria-labelledby={`work-${work.id}`}
            className="min-w-0 border-t border-vidals-border/25 pt-4"
          >
            <h3 id={`work-${work.id}`} className="text-xl font-semibold tracking-tight">
              {work.title}
            </h3>
            <p className="mt-2 mb-4 max-w-[54ch] text-sm leading-relaxed text-vidals-muted">
              {work.description}
            </p>
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
          </article>
        ))}
      </div>
    </section>
  );
}
