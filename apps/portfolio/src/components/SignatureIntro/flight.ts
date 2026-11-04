import { signatureMarkId } from './signature';

let signedThisDocument = false;

/** Animate the header's actual ink, not a second logo. The linked hit target never moves. */
export function beginSignatureFlight(stage: HTMLElement, copy: HTMLElement) {
  const mark = document.getElementById(signatureMarkId);
  const ink = mark?.querySelector('path');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  // A delayed bundle must not hide copy that the visitor has already started reading.
  const painted = performance.getEntriesByName('first-contentful-paint', 'paint')[0];
  const reading = painted && performance.now() - painted.startTime > 350;
  if (
    signedThisDocument ||
    !mark ||
    !ink ||
    typeof mark.animate !== 'function' ||
    reading ||
    preference.matches ||
    window.scrollY > 4 ||
    location.hash ||
    document.visibilityState === 'hidden'
  )
    return;

  const source = stage.getBoundingClientRect();
  const dock = mark.getBoundingClientRect();
  if (source.top >= window.innerHeight || source.bottom <= 0 || !dock.width || !source.width)
    return;

  // Fit inside the hero even on short phones; viewBox and native aspect ratio never change.
  const width = Math.min(
    source.width * 0.83,
    ((source.height * dock.width) / dock.height) * 0.94,
    330,
  );
  const scale = width / dock.width;
  if (scale < 1.4) return;
  const dx = source.left + (source.width - width) / 2 - dock.left;
  const dy = source.top + (source.height - dock.height * scale) / 2 - dock.top;
  const from = `translate3d(${dx}px,${dy}px,0) scale(${scale})`;
  const duration = 2450;

  const travel = mark.animate(
    [
      { transform: from, offset: 0 },
      { transform: from, offset: 0.36, easing: 'cubic-bezier(.43,.03,.14,1)' },
      { transform: 'translate3d(0,0,0) scale(1)', offset: 1 },
    ],
    { duration, fill: 'both' },
  );
  const write = ink.animate([{ strokeDashoffset: '.98' }, { strokeDashoffset: '0' }], {
    duration: 630,
    easing: 'cubic-bezier(.22,.7,.24,1)',
    fill: 'both',
  });
  const reveal = copy.animate(
    [
      { opacity: 0, offset: 0 },
      { opacity: 0, offset: 0.46 },
      { opacity: 1, offset: 0.82 },
      { opacity: 1, offset: 1 },
    ],
    { duration, fill: 'both' },
  );

  const controller = new AbortController();
  const release = () => {
    controller.abort();
    travel.cancel();
    write.cancel();
    reveal.cancel();
  };
  const settle = () => {
    signedThisDocument = true;
    release();
  };
  const options = { signal: controller.signal };
  travel.addEventListener('finish', settle, options);
  preference.addEventListener('change', settle, options);
  window.addEventListener('scroll', settle, { ...options, passive: true });
  window.addEventListener('resize', settle, options);
  document.addEventListener('focusin', settle, options);
  document.addEventListener('pointerdown', settle, { ...options, passive: true });
  document.addEventListener('visibilitychange', settle, options);
  window.addEventListener('pagehide', settle, options);
  return release;
}
