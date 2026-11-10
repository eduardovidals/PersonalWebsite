import { signatureMarkId } from './signature';

/** Lets the first-frame styles go; the flight's own keyframes, if any, take over. */
function disarm() {
  document.documentElement.removeAttribute('data-signing');
}

/** Both rectangles are in layout-viewport CSS pixels, even when the visible viewport shrinks. */
function takeoff(stage: HTMLElement, slot: HTMLElement, fromScreen: boolean) {
  const viewport = window.visualViewport;
  const scene = fromScreen
    ? {
        left: viewport?.offsetLeft ?? 0,
        top: viewport?.offsetTop ?? 0,
        width: viewport?.width ?? document.documentElement.clientWidth,
        height: viewport?.height ?? window.innerHeight,
      }
    : stage.getBoundingClientRect();
  // The slot stays in the header; measuring the flying SVG would feed its transform back into itself.
  const dock = slot.getBoundingClientRect();
  if (!dock.width || !dock.height || !scene.width || !scene.height) return;
  if (!fromScreen && (scene.top >= window.innerHeight || scene.top + scene.height <= 0)) return;
  const width = fromScreen
    ? Math.min(scene.width * 0.6, (scene.height * 0.42 * dock.width) / dock.height, 300)
    : Math.min(scene.width * 0.83, (scene.height * 0.94 * dock.width) / dock.height, 330);
  const scale = width / dock.width;
  if (scale < 1.4) return;
  const x = scene.left + (scene.width - width) / 2 - dock.left;
  const y = scene.top + (scene.height - dock.height * scale) / 2 - dock.top;
  // Resize the vector viewport itself. Scaling the composited header icon enlarges its pixels.
  const start = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${dock.height * scale}px`,
  };
  return [
    { ...start, offset: 0 },
    { ...start, offset: 0.46, easing: 'cubic-bezier(.43,.03,.14,1)' },
    { left: '0px', top: '0px', width: '100%', height: '100%', offset: 1 },
  ];
}

/** Whether any of the element is inside the window. */
function inView(element: HTMLElement) {
  const box = element.getBoundingClientRect();
  return box.bottom > 0 && box.top < window.innerHeight;
}

/**
 * Animate the header's actual ink, not a second logo. The linked hit target never moves. Once it
 * starts, the intro plays to the end through taps, clicks, scrolling and resizing; only keyboard
 * focus, a switch to reduced motion, or leaving the page settles it early.
 */
export function beginSignatureFlight(stage: HTMLElement, copy: HTMLElement) {
  const mark = document.getElementById(signatureMarkId);
  const slot = mark?.parentElement;
  const ink = mark?.querySelector('path');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  // Only a fresh homepage load is armed (by SignatureArm, before its first paint), so however late
  // this script arrives, the hero has stayed hidden and the intro still plays from the start.
  if (!root.hasAttribute('data-signing')) return;
  if (
    !mark ||
    !slot ||
    !ink ||
    typeof mark.animate !== 'function' ||
    preference.matches ||
    document.visibilityState === 'hidden'
  )
    return disarm();

  // Phones fly from the middle of the screen. Wider screens fly from the hero, or from the middle
  // of the screen when the visit starts away from it (a section link, or a restored scroll).
  // Keep the 64rem breakpoint in step with the first-frame styles in globals.css.
  const fromScreen = window.matchMedia('(width < 64rem)').matches || !inView(stage);
  const frames = takeoff(stage, slot, fromScreen);
  if (!frames) return disarm();
  const duration = 2450;

  const travel = mark.animate(frames, { duration, fill: 'both' });
  const write = ink.animate([{ strokeDashoffset: '.98' }, { strokeDashoffset: '0' }], {
    duration: 500,
    easing: 'cubic-bezier(.22,.7,.24,1)',
    fill: 'both',
  });
  const backdrop = fromScreen ? (stage.closest('section') ?? copy) : copy;
  const reveal = backdrop.animate(
    [
      { opacity: 0, offset: 0 },
      { opacity: 0, offset: 0.46 },
      { opacity: 1, offset: 0.82 },
      { opacity: 1, offset: 1 },
    ],
    { duration, fill: 'both' },
  );
  // The animations' first frames now hide what the armed styles hid. Taps pass through the hidden
  // hero until its copy is fully visible again, at 82% of the flight.
  root.setAttribute('data-signing', 'flying');
  const landing = window.setTimeout(
    () => root.setAttribute('data-signing', 'landing'),
    duration * 0.82,
  );

  const controller = new AbortController();
  const release = () => {
    controller.abort();
    window.clearTimeout(landing);
    travel.cancel();
    write.cancel();
    reveal.cancel();
  };
  const settle = () => {
    disarm();
    release();
  };
  const options = { signal: controller.signal };
  // Resizing or rotating keeps the ink on course; if the new layout has no takeoff, it flies on.
  const retarget = () => {
    const next = takeoff(stage, slot, fromScreen);
    if (next && travel.effect instanceof KeyframeEffect) travel.effect.setKeyframes(next);
  };
  travel.addEventListener('finish', settle, options);
  preference.addEventListener('change', settle, options);
  window.addEventListener('resize', retarget, options);
  window.visualViewport?.addEventListener('resize', retarget, options);
  window.visualViewport?.addEventListener('scroll', retarget, options);
  // The focus a click gives `<main>` is not focus-visible. Keyboard focus settles at once, so it
  // never lands on copy that cannot be seen yet.
  const focusSettles = (event: FocusEvent) => {
    if (event.target instanceof Element && event.target.matches(':focus-visible')) settle();
  };
  document.addEventListener('focusin', focusSettles, options);
  document.addEventListener('visibilitychange', settle, options);
  window.addEventListener('pagehide', settle, options);
  return release;
}
