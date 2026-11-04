import Link from 'next/link';

const jobs = [
  {
    company: 'Smarttwigs',
    role: 'Software Engineer Intern',
    start: ['2021-10', 'Oct 2021'],
    end: ['2022-05', 'May 2022'],
    story:
      'I started out building features in React and React Native. Working on subscriptions meant following a tap on a screen all the way through Stripe and our API. It taught me to look past my own part of the interface.',
  },
  {
    company: 'PGIM',
    role: 'Software Engineer Intern',
    start: ['2022-06', 'Jun 2022'],
    end: ['2023-07', 'Jul 2023'],
    story:
      'This was my first taste of building for other developers. I packaged Angular components and services so teams could install them, and wrote Cypress tests for the behavior they relied on.',
  },
  {
    company: 'PGIM',
    role: 'Software Engineer',
    start: ['2023-07', 'Jul 2023'],
    end: ['2026-03', 'Mar 2026'],
    story:
      'I led our department’s move from Angular to React. More than 50 shared components found a home in 20 internal apps. I also led delivery of 15+ full-stack apps using React, .NET, and SQL. Sometimes the best thing I could do for a user wasn’t a change to the screen: it was cutting a critical API’s response time in half.',
  },
  {
    company: 'Prudential Financial',
    role: 'Senior Software Engineer',
    start: ['2026-03', 'Mar 2026'],
    end: null,
    story:
      'I maintain and evolve our React and TypeScript design system. My focus is on accessible components that teams can use across applications. I also write examples and Claude Code skills so those same conventions carry through when someone builds with an agent.',
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
            I studied computer science at New Jersey City University. While I was interning at PGIM,
            I ran our software development club and taught its first frontend bootcamp. I still like
            the moment when an example clicks for someone. Away from the keyboard, you’ll usually
            find me running.
          </p>
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
          <aside
            aria-labelledby="factory-journey"
            className="mt-8 rounded-2xl bg-vidals-surface px-5 py-5 sm:px-7"
          >
            <h3 id="factory-journey" className="font-semibold">
              Outside my day job
            </h3>
            <p className="mt-2 max-w-[59ch] leading-relaxed text-vidals-muted">
              An anniversary gift and an order-entry dashboard have little in common. I built both
              with coding agents, using the same project structure and conventions. The agents
              didn’t need to invent a new way to build each feature. That’s the idea behind{' '}
              <Link
                href="/projects/#software-factory"
                className="rounded-sm font-medium text-vidals-accent underline underline-offset-4"
              >
                Software Factory
              </Link>
              : give agents a foundation to work from, and leave the next engineer with code they
              can understand, test, and change.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
