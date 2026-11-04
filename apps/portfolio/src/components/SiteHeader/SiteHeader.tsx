import Link from 'next/link';

const links = [
  ['Work', '/projects/'],
  ['Blog', '/blog/'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
] as const;

export function SiteHeader() {
  return (
    <header className="shell">
      <div className="flex min-h-16 flex-wrap items-center justify-between gap-x-3 border-b border-vidals-text py-1.5 md:min-h-20">
        <Link
          href="/"
          aria-label="Eduardo Vidals — home"
          className="flex min-h-11 items-center gap-2.5"
        >
          <svg aria-hidden="true" viewBox="0 0 44 38" width="44" height="38">
            <path d="M0 0h44v38H0z" fill="var(--color-vidals-print)" />
            <path
              d="M8 9h12l-1 4h-7l-1 4h7l-1 4h-7l-1 4h8l-1 4H3zm13 0h5l1 14 8-14h6L28 29h-5z"
              fill="var(--color-vidals-paper)"
            />
          </svg>
          <span className="signature-name hidden font-mono text-sm font-bold tracking-tight sm:block">
            Eduardo Vidals
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-4 text-sm font-semibold sm:gap-x-8"
        >
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="inline-flex min-h-11 items-center hover:text-vidals-accent hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
