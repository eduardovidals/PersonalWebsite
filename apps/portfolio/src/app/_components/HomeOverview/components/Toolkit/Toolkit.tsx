import Link from 'next/link';
import { ToolChips } from '@/components/ToolChips';
import { aiTools, featuredTools, toolkit } from './toolkit-data';

const featuredNames = new Set<string>(featuredTools);
const moreTools = toolkit
  .map(({ title, tools }) => ({ title, tools: tools.filter((tool) => !featuredNames.has(tool)) }))
  .filter(({ tools }) => tools.length > 0);

export function Toolkit() {
  return (
    <section id="skills" aria-labelledby="toolkit-heading" className="shell py-10 sm:py-16">
      <h2
        id="toolkit-heading"
        className="mb-5 text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.08] font-semibold tracking-[-.045em] sm:mb-7"
      >
        My toolkit
      </h2>
      <div className="max-w-4xl">
        <ToolChips tools={featuredTools} label="Everyday tools" />
        <h3 className="mt-6 mb-2.5 text-sm font-semibold text-vidals-muted">AI & coding agents</h3>
        <ToolChips tools={aiTools} label="AI tools" />
        <Link
          href="/projects/#current-work"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-vidals-accent underline-offset-4 hover:underline"
        >
          How I use them in my projects <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <details className="group mt-4">
        <summary className="inline-flex min-h-11 max-w-full cursor-pointer list-none items-center gap-2 rounded-md px-1 text-sm font-medium text-vidals-accent underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">More tools</span>
          <span className="hidden group-open:inline">Fewer tools</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            className="size-3.5 group-open:rotate-180"
          >
            <path
              d="m3 6 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>
        <div className="mt-3 grid gap-x-10 gap-y-6 border-t border-vidals-border/20 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreTools.map(({ title, tools }) => (
            <div key={title} className="min-w-0">
              <h3 className="mb-2.5 text-sm font-semibold text-vidals-muted">{title}</h3>
              <ToolChips tools={tools} label={`Tools for ${title}`} />
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
