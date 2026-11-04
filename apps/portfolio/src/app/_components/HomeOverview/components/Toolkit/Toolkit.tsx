import { toolkit } from './toolkit-data';

type Family = (typeof toolkit)[number];

function FamilyList({ families }: Readonly<{ families: readonly Family[] }>) {
  return (
    <ul className="grid min-w-0 gap-x-12 gap-y-7 md:grid-cols-2">
      {families.map(({ title, description, tools }) => (
        <li key={title} className="min-w-0 [overflow-wrap:anywhere]">
          <h3 className="text-lg leading-snug font-semibold tracking-tight text-vidals-text">
            {title}
          </h3>
          <p className="mt-1 max-w-[54ch] text-sm leading-relaxed text-vidals-muted">
            {description}
          </p>
          <ul
            aria-label={`Tools for ${title}`}
            className="mt-2 text-[15px] leading-relaxed text-vidals-highlight"
          >
            {tools.map((tool, index) => (
              <li key={tool} className="inline">
                {tool}
                {index < tools.length - 1 && ', '}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function Toolkit() {
  const core = toolkit.slice(0, 4);
  const additional = toolkit.slice(4);

  return (
    <section id="skills" aria-labelledby="toolkit-heading" className="shell py-12 sm:py-16">
      <div className="rounded-[2rem] bg-vidals-deep p-5 sm:p-9 lg:p-11">
        <h2
          id="toolkit-heading"
          className="mb-7 text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.08] font-semibold tracking-[-.045em] sm:mb-9"
        >
          My toolkit
        </h2>
        <FamilyList families={core} />
        {additional.length > 0 && (
          <details className="mt-7">
            <summary className="w-fit max-w-full cursor-pointer rounded-full bg-vidals-surface px-4 py-3 text-sm font-medium text-vidals-accent hover:text-vidals-highlight">
              More tools ({additional.length} {additional.length === 1 ? 'group' : 'groups'})
            </summary>
            <div className="pt-6">
              <FamilyList families={additional} />
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
