'use client';

import { useLayoutEffect, useRef } from 'react';
import { beginSignatureFlight } from './flight';
import type { SignatureIntroProps as Props } from './types';

/**
 * Flies the handwritten EV from the center of the screen into the header's home link on a fresh
 * visit. Children are the resting hero composition and remain usable without JavaScript or motion.
 * @example
 * ```tsx
 * <SignatureIntro>
 *   <p>These Days</p>
 * </SignatureIntro>
 * ```
 */
export function SignatureIntro(props: Props) {
  const { children } = props;
  const stage = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (stage.current && copy.current) return beginSignatureFlight(stage.current, copy.current);
  }, []);

  return (
    <div
      ref={stage}
      data-signature-stage=""
      className="relative grid min-h-40 min-w-0 items-center sm:min-h-48"
    >
      <div ref={copy} data-signature-resting="">
        {children}
      </div>
    </div>
  );
}
