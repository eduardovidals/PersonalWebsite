'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { VidalsButton } from '@vidals/react-components';
import { typingFrames } from './typing';

function subscribe(listener: () => void) {
  const match = window.matchMedia('(prefers-reduced-motion: no-preference)');
  match.addEventListener('change', listener);
  return () => match.removeEventListener('change', listener);
}
function motionAllowed() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}
function staticSnapshot() {
  return false;
}

/** Animate only the visual copy. Assistive technology always receives a complete, stable greeting. */
export function TypedGreeting() {
  const motion = useSyncExternalStore(subscribe, motionAllowed, staticSnapshot);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = position === typingFrames.length - 1;
  useEffect(() => {
    if (!motion || paused || last) return;
    const timer = window.setTimeout(() => setPosition(position + 1), typingFrames[position].delay);
    return () => window.clearTimeout(timer);
  }, [motion, paused, last, position]);
  const toggle = () => {
    if (last) {
      setPosition(0);
      setPaused(false);
    } else setPaused(!paused);
  };
  return (
    <div
      role="group"
      aria-label="Role animation"
      className="flex min-h-11 w-fit items-center gap-1 rounded-full bg-vidals-surface/80 ps-4 pe-1 ring-1 ring-inset ring-white/10"
    >
      <p className="font-mono text-xs font-medium text-vidals-accent">
        <span className="sr-only">Software Engineer.</span>
        <span aria-hidden="true" className="inline-block min-w-[19ch]">
          {typingFrames[motion ? position : 0].word}
          <span className="ms-0.5 inline-block h-[.88em] w-0.5 align-[-.055em] bg-vidals-accent" />
        </span>
      </p>
      {motion && (
        <VidalsButton
          variant="subtle"
          onPress={toggle}
          className="size-11 rounded-full border-transparent p-0 text-vidals-muted"
          aria-label={last ? 'Replay typing' : paused ? 'Resume typing' : 'Pause typing'}
        >
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            {last ? (
              <path d="M3 4a6 6 0 1 1-1 7l1.8-.8a4.1 4.1 0 1 0 .5-4.6L6.5 8H1V2.7z" />
            ) : paused ? (
              <path d="M4 2l9 6-9 6z" />
            ) : (
              <path d="M3 2h3v12H3zm7 0h3v12h-3z" />
            )}
          </svg>
        </VidalsButton>
      )}
    </div>
  );
}
