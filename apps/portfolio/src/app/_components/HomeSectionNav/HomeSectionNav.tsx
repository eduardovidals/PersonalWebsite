'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  ['projects', 'Work'],
  ['about', 'Career'],
  ['skills', 'Toolkit'],
  ['blog', 'Blog'],
  ['contact', 'Contact'],
] as const;

export function HomeSectionNav() {
  const nav = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    const bar = nav.current;
    const targets = sections.flatMap(([id]) => document.getElementById(id) ?? []);
    if (!bar || !targets.length) return;
    let frame = 0;
    function measure() {
      frame = 0;
      const atEnd =
        Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
      const readingLine = (bar?.offsetHeight ?? 0) + Math.min(100, window.innerHeight * 0.15);
      const visible = atEnd
        ? targets.at(-1)
        : targets.findLast((el) => el.getBoundingClientRect().top <= readingLine);
      setCurrent(visible?.id);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    const observer = new ResizeObserver(schedule);
    [bar, ...targets].forEach((el) => observer.observe(el));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      ref={nav}
      aria-label="On this page"
      className="home-section-nav sticky top-0 z-20 border-y border-vidals-border/45 bg-vidals-background"
    >
      <div className="shell flex min-h-12 items-center gap-6 max-sm:px-2">
        <span aria-hidden="true" className="hidden text-sm font-medium text-vidals-muted sm:inline">
          On this page
        </span>
        <div className="flex min-w-0 flex-1 flex-wrap items-stretch justify-between sm:flex-none sm:gap-4">
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={'#' + id}
              aria-current={current === id ? 'location' : undefined}
              className="inline-flex min-h-12 items-center px-1.5 text-xs font-medium text-vidals-muted decoration-2 underline-offset-8 hover:text-vidals-text aria-[current]:font-bold aria-[current]:text-vidals-accent aria-[current]:underline min-[400px]:text-sm sm:px-2"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
