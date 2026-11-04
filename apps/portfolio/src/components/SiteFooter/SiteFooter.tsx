import Link from 'next/link';
import { profiles } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-8 text-sm">
      <p className="font-medium text-vidals-muted">
        Eduardo Vidals <span aria-hidden="true"> · </span> Software engineer
      </p>
      <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 text-vidals-muted">
        {Object.entries(profiles).map(([name, url]) => (
          <a
            key={name}
            href={url}
            className="inline-flex min-h-11 items-center hover:text-vidals-accent"
          >
            {name}
          </a>
        ))}
        <a href="/feed.xml" className="inline-flex min-h-11 items-center hover:text-vidals-accent">
          RSS
        </a>
        <Link href="/#home" className="inline-flex min-h-11 items-center hover:text-vidals-accent">
          Top ↑
        </Link>
      </nav>
    </footer>
  );
}
