import { signatureMarkId } from './signature';

/** Lets the first-frame styles go; the flight's own keyframes, if any, take over. */
function disarm() {
  document.documentElement.removeAttribute('data-signing');
}

/** Where the ink takes off, relative to its docked slot, in layout-viewport CSS pixels. */
interface Takeoff {
  x: number;
  y: number;
  width: number;
  height: number;
  /** How many times larger than the docked ink. */
  scale: number;
}

/** Both rectangles are in layout-viewport CSS pixels, even when the visible viewport shrinks. */
function takeoff(stage: HTMLElement, slot: HTMLElement, fromScreen: boolean): Takeoff | undefined {
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
  const height = dock.height * scale;
  const x = scene.left + (scene.width - width) / 2 - dock.left;
  const y = scene.top + (scene.height - height) / 2 - dock.top;
  return { x, y, width, height, scale };
}

/**
 * Lays the ink out once at its takeoff size and place. The flight then moves it with transforms
 * alone, which the compositor runs smoothly even while the page scrolls, and only ever shrinks it
 * from the size it was drawn at, so the vector stays sharp. `right: auto` keeps right-to-left
 * pages from pinning it to the slot's inline start.
 */
function place(mark: SVGSVGElement, start: Takeoff) {
  Object.assign(mark.style, {
    left: `${start.x}px`,
    top: `${start.y}px`,
    right: 'auto',
    width: `${start.width}px`,
    height: `${start.height}px`,
    transformOrigin: '0 0',
  });
}

/** Holds at takeoff, then shrinks the ink onto its docked slot. */
function homeward(start: Takeoff): Keyframe[] {
  return [
    { transform: 'none', offset: 0 },
    { transform: 'none', offset: 0.46, easing: 'cubic-bezier(.43,.03,.14,1)' },
    {
      transform: `translate(${-start.x}px, ${-start.y}px) scale(${1 / start.scale})`,
      offset: 1,
    },
  ];
}

/** Returns the ink to its docked layout. */
function unplace(mark: SVGSVGElement) {
  for (const property of ['left', 'top', 'right', 'width', 'height', 'transform-origin'])
    mark.style.removeProperty(property);
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
  const element = document.getElementById(signatureMarkId);
  const mark = element instanceof SVGSVGElement ? element : null;
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
  const start = takeoff(stage, slot, fromScreen);
  if (!start) return disarm();
  const duration = 2450;

  place(mark, start);
  const travel = mark.animate(homeward(start), { duration, fill: 'both' });
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
  let frame = 0;
  const release = () => {
    controller.abort();
    window.clearTimeout(landing);
    cancelAnimationFrame(frame);
    travel.cancel();
    write.cancel();
    reveal.cancel();
    unplace(mark);
  };
  const settle = () => {
    disarm();
    release();
  };
  const options = { signal: controller.signal };
  // Resizing or rotating keeps the ink on course, at most once a frame, since phones resize the
  // visual viewport as their toolbars slide during a scroll. With no takeoff, it flies on.
  const retarget = () => {
    frame ||= requestAnimationFrame(() => {
      frame = 0;
      const next = takeoff(stage, slot, fromScreen);
      if (!next || !(travel.effect instanceof KeyframeEffect)) return;
      place(mark, next);
      travel.effect.setKeyframes(homeward(next));
    });
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
