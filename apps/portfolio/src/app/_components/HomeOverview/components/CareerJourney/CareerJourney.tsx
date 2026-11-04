import Link from 'next/link';

const jobs = [
  {
    company: 'Smarttwigs',
    role: 'Software Engineer Intern',
    start: ['2021-10', 'Oct 2021'],
    end: ['2022-05', 'May 2022'],
    story:
      'I built React Native screens and the REST endpoint behind a leaderboard. It was my first experience owning both sides of a feature.',
  },
  {
    company: 'PGIM',
    role: 'Software Engineer Intern',
    start: ['2022-06', 'Jun 2022'],
    end: ['2023-07', 'Jul 2023'],
    story:
      'I published Angular components and services for other teams. For the first time, the person I was building for was another developer.',
  },
  {
    company: 'PGIM',
    role: 'Software Engineer',
    start: ['2023-07', 'Jul 2023'],
    end: ['2026-03', 'Mar 2026'],
    story:
      'I led our department’s move to React and the full-stack framework used across 20 apps. I also led delivery of 15+ applications with React, .NET, and SQL, and helped five teams get comfortable building on the platform.',
  },
  {
    company: 'Prudential Financial',
    role: 'Senior Software Engineer',
    start: ['2026-03', 'Mar 2026'],
    end: null,
    story:
      'I work on the React and TypeScript design system: accessible components, the examples that teach them, and conventions developers and coding agents can both follow.',
  },
] as const;

export function CareerJourney() {
  return (
    <section id="about" aria-labelledby="about-heading" className="shell py-12 sm:py-20">
      <div className="grid items-start gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="max-w-[42ch]">
          <p className="mb-3 font-mono text-xs text-vidals-accent">My career</p>
          <h2
            id="about-heading"
            className="text-balance text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.08] font-semibold tracking-[-.045em]"
          >
            How I got here
          </h2>
          <p className="mt-5 leading-relaxed text-vidals-muted">
            At NJCU I taught our club’s first frontend bootcamp. I still love the moment an example
            clicks and someone can go build without me.
          </p>
          <Link
            href="/about/"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-vidals-accent underline underline-offset-4"
          >
            Read my story <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="min-w-0">
          <ol aria-label="Career timeline" className="ms-1.5">
            {jobs.map(({ company, role, start, end, story }) => (
              <li
                key={start[0]}
                className="relative border-s border-vidals-border/45 ps-6 pb-7 last:border-transparent last:pb-0 sm:ps-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -start-[5px] top-1.5 size-[9px] rounded-full ring-4 ring-vidals-background ${end ? 'bg-vidals-border' : 'bg-vidals-accent'}`}
                />
                <p className="font-mono text-xs leading-5 text-vidals-muted">
                  <time dateTime={start[0]}>{start[1]}</time> –{' '}
                  {end ? <time dateTime={end[0]}>{end[1]}</time> : 'Present'}
                </p>
                <h3 className="mt-1 text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                  {company}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-vidals-accent">{role}</p>
                <p className="mt-2 max-w-[59ch] text-pretty leading-relaxed text-vidals-muted">
                  {story}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
