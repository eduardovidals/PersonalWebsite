import Link from 'next/link';
import { profiles } from '@/config/site';
import { signatureMarkId, signaturePath } from '@/components/SignatureIntro/signature';

const links = [
  ['Work', '/projects/'],
  ['Blog', '/blog/'],
  ['About', '/about/'],
  ['Contact', '/#contact'],
] as const;

export function SiteHeader() {
  return (
    <header className="shell relative z-30">
      <div className="grid min-h-18 grid-cols-[auto_minmax(0,1fr)] items-start gap-2 py-3 sm:min-h-22 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:py-4">
        <Link
          href="/"
          aria-label="Eduardo Vidals — home"
          className="inline-flex min-h-11 min-w-14 items-center justify-center justify-self-start rounded-xl text-vidals-accent hover:text-vidals-text sm:min-w-16"
        >
          <span className="pointer-events-none relative block aspect-[37/25] w-13 sm:w-16">
            <svg
              id={signatureMarkId}
              aria-hidden="true"
              focusable="false"
              viewBox="4 10 37 25"
              width="37"
              height="25"
              className="absolute top-0 left-0 block h-full w-full overflow-visible"
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
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-wrap items-center justify-self-end rounded-3xl bg-vidals-surface/95 p-1 shadow-lg shadow-black/15 ring-1 ring-inset ring-white/10 sm:justify-self-center sm:rounded-full"
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
        <a
          href={profiles.GitHub}
          className="hidden min-h-11 items-center gap-1.5 justify-self-end rounded-full px-2 text-sm font-medium text-vidals-muted hover:text-vidals-accent sm:inline-flex"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
