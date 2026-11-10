'use client';

import { VidalsLink } from '@vidals/react-components';
import { useEffect, useRef, useState } from 'react';
import { barStyles, labelStyles, linkStyles } from './styles';
import type { SectionNavProps as Props } from './types';

/**
 * Sticky tabs for the homepage sections. The tab for the section under the reading line is
 * marked as the current location while the reader scrolls.
 * @example
 * ```tsx
 * <SectionNav label="On This Page" sections={[{ id: 'projects', label: 'Work' }]} />
 * ```
 */
export function SectionNav(props: Props) {
  const { label, sections } = props;
  const nav = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    const bar = nav.current;
    const targets = sections.flatMap(({ id }) => document.getElementById(id) ?? []);
    if (!bar || !targets.length) return;
    let frame = 0;
    function measure() {
      frame = 0;
      const atEnd =
        Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
      // Measure from where the bar sticks (under the header), not where it sits before scrolling.
      const stuckBottom = bar ? parseFloat(getComputedStyle(bar).top) + bar.offsetHeight : 0;
      const readingLine = stuckBottom + Math.min(100, window.innerHeight * 0.15);
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
  }, [sections]);

  return (
    <nav ref={nav} aria-label={label} className={barStyles}>
      <div className="shell flex min-h-12 items-stretch gap-4 max-sm:px-1">
        <span aria-hidden="true" className={labelStyles}>
          {label}
        </span>
        <div className="flex min-w-0 flex-1 items-stretch">
          {sections.map((section) => (
            <VidalsLink
              key={section.id}
              variant="plain"
              href={'#' + section.id}
              aria-current={current === section.id ? 'location' : undefined}
              data-ripple=""
              className={linkStyles}
            >
              {section.label}
            </VidalsLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
