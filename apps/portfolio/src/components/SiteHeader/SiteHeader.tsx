import Link from 'next/link';

/** The name signs down to EV without covering the page or delaying its navigation. */
export function SiteHeader() {
  return (
    <header className="border-b border-vidals-border/50 bg-vidals-surface">
      <div className="shell flex min-h-18 flex-wrap items-center justify-between gap-x-5 gap-y-1 py-2">
        <Link
          href="/"
          aria-label="Eduardo Vidals — home"
          className="signature inline-flex min-h-11 items-center font-mono text-2xl font-bold text-vidals-text"
        >
          <span aria-hidden="true" className="signature-name">
            Eduardo Vidals
          </span>
          <span aria-hidden="true" className="signature-mark">
            EV
          </span>
          <span aria-hidden="true" className="text-vidals-accent">
            _
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-3 text-sm font-medium text-vidals-text sm:gap-x-7"
        >
          <Link
            className="inline-flex min-h-11 items-center hover:text-vidals-accent hover:underline"
            href="/#about"
          >
            About
          </Link>
          <Link
            className="inline-flex min-h-11 items-center hover:text-vidals-accent hover:underline"
            href="/projects/"
          >
            Projects
          </Link>
          <Link
            className="inline-flex min-h-11 items-center hover:text-vidals-accent hover:underline"
            href="/blog/"
          >
            Blog
          </Link>
          <Link
            className="inline-flex min-h-11 items-center hover:text-vidals-accent hover:underline"
            href="/#contact"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
