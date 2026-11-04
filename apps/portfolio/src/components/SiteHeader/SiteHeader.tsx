import Link from 'next/link';
import { profiles } from '@/config/site';

const links = [
  ['Work', '/projects/'],
  ['Blog', '/blog/'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
] as const;

export function SiteHeader() {
  return (
    <header className="shell">
      <div className="flex min-h-18 flex-wrap items-center justify-between gap-2 py-2.5 sm:grid sm:min-h-24 sm:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Eduardo Vidals — home"
          className="inline-flex min-h-11 w-fit items-center gap-2.5 rounded-full"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" width="43" height="43">
            <circle cx="24" cy="24" r="23" fill="var(--color-vidals-accent)" />
            <path
              d="M7 25q5 0 9-4c5-6 1-9-3-6-5 4-5 15 1 15 5 0 9-6 12-12-1 7-2 14 1 13 4-2 9-12 11-17"
              fill="none"
              stroke="#211a31"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="signature-name hidden text-base font-semibold tracking-tight lg:block">
            Eduardo Vidals
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="inline-flex flex-wrap items-center rounded-full bg-vidals-surface/95 p-1 shadow-lg shadow-black/15 ring-1 ring-inset ring-white/10"
        >
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-vidals-text transition-colors hover:bg-vidals-poster hover:text-vidals-accent sm:px-4"
            >
              {label}
            </Link>
          ))}
        </nav>
        <a
          href={profiles.GitHub}
          className="hidden min-h-11 items-center gap-1.5 justify-self-end rounded-full px-2 text-sm font-medium text-vidals-muted hover:text-vidals-text sm:inline-flex"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
