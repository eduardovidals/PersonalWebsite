import Link from 'next/link';
import { profiles } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-wrap items-baseline justify-between gap-4 py-8 text-sm">
        <p className="font-semibold">
          Eduardo Vidals <span aria-hidden="true">/</span>{' '}
          <span className="font-normal text-muted">Software engineer</span>
        </p>
        <nav
          aria-label="Footer"
          className="flex gap-5 underline decoration-line underline-offset-4"
        >
          {Object.entries(profiles).map(([name, url]) => (
            <a key={name} href={url}>
              {name}
            </a>
          ))}
          <a href="/feed.xml">RSS</a>
          <Link href="/#home">Top ↑</Link>
        </nav>
      </div>
    </footer>
  );
}
