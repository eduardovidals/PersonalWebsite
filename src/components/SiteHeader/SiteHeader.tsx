import Link from 'next/link';

/** Persistent navigation; all destinations remain available without client JavaScript. */
export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="shell flex min-h-20 flex-wrap items-center justify-between gap-x-5 gap-y-2 py-3">
        <Link
          href="/"
          aria-label="Eduardo Vidals — home"
          className="inline-flex items-center gap-3 font-bold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-sm bg-ink font-mono text-base tracking-[-.12em] text-paper"
          >
            ev<span className="sr-only">.</span>
          </span>
          <span className="text-lg">
            Eduardo Vidals<span className="text-accent">.</span>
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-4 text-sm font-semibold sm:gap-8"
        >
          <Link className="py-2 hover:text-accent hover:underline" href="/projects/">
            Work
          </Link>
          <Link className="py-2 hover:text-accent hover:underline" href="/blog/">
            Blog
          </Link>
          <Link className="border-b border-ink py-1 hover:text-accent" href="/#contact">
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
