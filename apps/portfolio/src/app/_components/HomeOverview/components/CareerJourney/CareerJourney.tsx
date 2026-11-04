import Link from 'next/link';
import { HomeSection } from '../../HomeSection';

const jobs = [
  {
    company: 'Smarttwigs',
    role: 'Software Engineer Intern',
    start: ['2021-10', 'Oct 2021'],
    end: ['2022-05', 'May 2022'],
    story:
      'I built mobile screens for Props in React Native and wrote the API for its leaderboard.',
  },
  {
    company: 'PGIM',
    role: 'Software Engineer Intern',
    start: ['2022-06', 'Jun 2022'],
    end: ['2023-07', 'Jul 2023'],
    story:
      'I built Angular components and services that other PGIM teams could reuse in their apps.',
  },
  {
    company: 'PGIM',
    role: 'Software Engineer',
    start: ['2023-07', 'Jul 2023'],
    end: ['2026-03', 'Mar 2026'],
    story:
      'I led the move from Angular to React on PInnacle, the platform behind 20 of our internal apps. I also led development on 15+ apps built with React, .NET, and SQL.',
  },
  {
    company: 'Prudential Financial',
    role: 'Senior Software Engineer',
    start: ['2026-03', 'Mar 2026'],
    end: null,
    story:
      'I build accessible React and TypeScript components for DX, our design system. I also refactored PEAQ, an app our brokers use for structured settlements and Income Advantage.',
  },
] as const;

export function CareerJourney() {
  return (
    <HomeSection id="about" labelledBy="about-heading">
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
            I ran the software development club at NJCU and taught our first frontend bootcamp while
            I was interning at PGIM.
          </p>
          <Link
            href="/about/"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-vidals-accent underline underline-offset-4"
          >
            Read my story <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/about/#whats-next"
            className="ms-4 inline-flex min-h-11 items-center rounded-sm text-sm text-vidals-muted underline underline-offset-4 hover:text-vidals-accent"
          >
            What’s next
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
    </HomeSection>
  );
}
