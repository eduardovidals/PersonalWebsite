import Link from 'next/link';
import { profiles } from '@/config/site';
import { signatureMarkId, signaturePath } from '@/components/SignatureIntro/signature';

const links = [
  ['Work', '/projects/'],
  ['Blog', '/blog/'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
] as const;

export function SiteHeader() {
  return (
    <header className="shell relative z-30">
      <div className="grid min-h-18 grid-cols-[minmax(0,1fr)_auto] items-start gap-2 py-3 sm:min-h-22 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:py-4">
        <a
          href={profiles.GitHub}
          className="hidden min-h-11 items-center gap-1.5 justify-self-start rounded-full px-2 text-sm font-medium text-vidals-muted hover:text-vidals-accent sm:inline-flex"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-wrap items-center justify-self-start rounded-3xl bg-vidals-surface/95 p-1 shadow-lg shadow-black/15 ring-1 ring-inset ring-white/10 sm:justify-self-center sm:rounded-full"
        >
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="inline-flex min-h-11 items-center rounded-full px-1.5 text-xs font-medium text-vidals-text transition-colors hover:bg-vidals-poster hover:text-vidals-accent max-[360px]:px-0.5 sm:px-4 sm:text-sm"
            >
              {label}
            </Link>
          ))}
          <a
            href={profiles.GitHub}
            className="inline-flex min-h-11 items-center gap-1 rounded-full px-1.5 text-xs font-medium text-vidals-muted hover:text-vidals-accent max-[360px]:px-0.5 sm:hidden"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <Link
          href="/"
          aria-label="Eduardo Vidals — home"
          className="inline-flex min-h-11 min-w-14 items-center justify-center justify-self-end rounded-xl text-vidals-accent hover:text-vidals-text sm:min-w-16"
        >
          <span className="pointer-events-none block w-13 sm:w-16">
            <svg
              id={signatureMarkId}
              aria-hidden="true"
              focusable="false"
              viewBox="4 10 37 25"
              width="62"
              height="42"
              className="block h-auto w-full origin-top-left overflow-visible"
            >
              <path
                d={signaturePath}
                pathLength="1"
                strokeDasharray="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </header>
  );
}
