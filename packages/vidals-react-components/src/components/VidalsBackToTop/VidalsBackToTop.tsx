import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { VidalsIconButton } from '../VidalsIconButton/index.js';
import { buttonStyles, hiddenStyles, visibleStyles, wrapperStyles } from './styles.js';
import type { VidalsBackToTopProps as Props } from './types.js';

/**
 * A floating return-to-top control that appears only after the reader has scrolled well past the
 * first view, glides back up (or jumps with reduced motion), and hands focus to the page start.
 * @example
 * ```tsx
 * <VidalsBackToTop focusTargetId="main-content" />
 * ```
 */
export function VidalsBackToTop(props: Props) {
  const { threshold = 1.5, focusTargetId, label = 'Back to top', className } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    function measure() {
      frame = 0;
      setVisible(threshold <= 0 || window.scrollY > window.innerHeight * threshold);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);

  function backToTop() {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    if (focusTargetId) document.getElementById(focusTargetId)?.focus({ preventScroll: true });
  }

  return (
    <div
      inert={!visible}
      aria-hidden={!visible || undefined}
      data-visible={visible || undefined}
      className={twMerge(wrapperStyles, visible ? visibleStyles : hiddenStyles, className)}
    >
      <VidalsIconButton
        aria-label={label}
        onPress={backToTop}
        excludeFromTabOrder={!visible}
        className={buttonStyles}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </VidalsIconButton>
    </div>
  );
}
