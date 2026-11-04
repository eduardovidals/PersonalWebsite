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
    <>
      <h1 className="text-balance text-[clamp(2.2rem,6.5vw,4.8rem)] leading-[1.13] font-bold tracking-tight">
        <span className="sr-only">Hello, I’m Eduardo, a Software Engineer.</span>
        <span aria-hidden="true" className="block">
          Hello, I’m Eduardo, a
        </span>
        <span aria-hidden="true" className="block min-h-[1.2em] text-vidals-accent">
          {typingFrames[motion ? position : 0].word}
          <span className="ms-1 inline-block h-[.88em] w-[.055em] align-[-.055em] bg-vidals-accent" />
        </span>
      </h1>
      <div className="mt-3 flex min-h-11 justify-center">
        {motion && (
          <VidalsButton variant="subtle" onPress={toggle}>
            {last ? 'Replay typing' : paused ? 'Resume typing' : 'Pause typing'}
          </VidalsButton>
        )}
      </div>
    </>
  );
}
