'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { beginSignatureFlight } from './flight';

/** Children are the resting hero composition and remain usable without JavaScript or motion. */
export function SignatureIntro({ children }: Readonly<{ children: ReactNode }>) {
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
