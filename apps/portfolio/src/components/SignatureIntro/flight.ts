import { signatureMarkId } from './signature';

/** The whole intro, in milliseconds. */
const duration = 2000;
/** The ink is written by this share of the intro, holds until `hold`, then flies home. */
const written = 0.2;
const hold = 0.46;
/** The hidden copy is fully visible again here, and takes taps from then on. */
const revealed = 0.82;

/** Lets the first-frame styles go; the flight's own animations, if any, take over. */
function disarm() {
  document.documentElement.removeAttribute('data-signing');
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Where the ink holds before it flies, in layout-viewport CSS pixels: the middle of the visible
 * screen, or the hero on wide screens. Nothing when there is no room for a large mark.
 */
function takeoff(stage: HTMLElement, dock: DOMRect, fromScreen: boolean): Box | undefined {
  const viewport = window.visualViewport;
  const scene = fromScreen
    ? {
        left: viewport?.offsetLeft ?? 0,
        top: viewport?.offsetTop ?? 0,
        width: viewport?.width ?? document.documentElement.clientWidth,
        height: viewport?.height ?? window.innerHeight,
      }
    : stage.getBoundingClientRect();
  if (!dock.width || !dock.height || !scene.width || !scene.height) return;
  const width = fromScreen
    ? Math.min(scene.width * 0.6, (scene.height * 0.42 * dock.width) / dock.height, 300)
    : Math.min(scene.width * 0.83, (scene.height * 0.94 * dock.width) / dock.height, 330);
  if (width / dock.width < 1.4) return;
  const height = (width * dock.height) / dock.width;
  return {
    left: scene.left + (scene.width - width) / 2,
    top: scene.top + (scene.height - height) / 2,
    width,
    height,
  };
}

/** Whether any of the element is inside the window. */
function inView(element: HTMLElement) {
  const box = element.getBoundingClientRect();
  return box.bottom > 0 && box.top < window.innerHeight;
}

/**
 * Flies the header's actual ink, not a second logo, from the middle of the screen (or the hero)
 * into its slot. The linked hit target never moves.
 *
 * The ink is laid out once at its takeoff size, anchored to its slot, and the browser's animation
 * engine moves and shrinks it with a transform, off the main thread, so it stays smooth while the
 * page scrolls and only ever shrinks, staying sharp. Its last keyframe is the slot itself, with no
 * offset, so it lands exactly in the slot however the toolbar, scroll or window changes.
 *
 * Once it starts, it plays to the end through taps, clicks, scrolling and resizing, and pauses
 * while the page is hidden. Only keyboard focus, a switch to reduced motion, or leaving the page
 * settles it early.
 */
export function beginSignatureFlight(stage: HTMLElement, copy: HTMLElement) {
  // Only a fresh homepage load is armed (by SignatureArm, before its first paint), so however late
  // this script arrives, the hero has stayed hidden and the intro still plays from the start.
  if (!document.documentElement.hasAttribute('data-signing')) return;
  // A page that loads in the background waits until it is shown, instead of skipping the intro.
  if (document.visibilityState === 'hidden') {
    let release: (() => void) | undefined;
    const show = () => {
      if (document.visibilityState === 'hidden') return;
      document.removeEventListener('visibilitychange', show);
      release = fly(stage, copy);
    };
    document.addEventListener('visibilitychange', show);
    return () => {
      document.removeEventListener('visibilitychange', show);
      release?.();
    };
  }
  return fly(stage, copy);
}

function fly(stage: HTMLElement, copy: HTMLElement): (() => void) | undefined {
  const root = document.documentElement;
  const mark = document.getElementById(signatureMarkId);
  const slot = mark?.parentElement;
  const ink = mark?.querySelector('path');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mark || !slot || !ink || typeof mark.animate !== 'function' || preference.matches) {
    disarm();
    return;
  }

  // Phones fly from the middle of the screen. Wider screens fly from the hero, or from the middle
  // of the screen when the visit starts away from it (a section link, or a restored scroll).
  // Keep the 64rem breakpoint in step with the first-frame styles in globals.css.
  const fromScreen = window.matchMedia('(width < 64rem)').matches || !inView(stage);
  const first = takeoff(stage, slot.getBoundingClientRect(), fromScreen);
  if (!first) {
    disarm();
    return;
  }
  // Drawn at takeoff size from the slot's top-left corner. `right: auto` keeps right-to-left pages
  // from pinning it to the slot's inline start.
  const draw = (box: Box) =>
    Object.assign(mark.style, {
      left: '0px',
      top: '0px',
      right: 'auto',
      width: `${box.width}px`,
      height: `${box.height}px`,
      transformOrigin: '0 0',
    });
  // Holds at takeoff, then glides to no offset at the slot's own size.
  const homeward = (box: Box, dock: DOMRect): Keyframe[] => {
    const away = `translate(${box.left - dock.left}px, ${box.top - dock.top}px) scale(1)`;
    return [
      { transform: away, offset: 0 },
      { transform: away, offset: hold, easing: 'cubic-bezier(.43,.03,.14,1)' },
      { transform: `translate(0px, 0px) scale(${dock.width / box.width})`, offset: 1 },
    ];
  };

  draw(first);
  let launch = { box: first, dock: slot.getBoundingClientRect(), width: window.innerWidth };
  let travel = mark.animate(homeward(first, launch.dock), { duration, fill: 'both' });
  // Marks the moment the hidden copy is fully visible, pausing with the rest. It times the page,
  // not the ink, so the ink's own animations are only its flight and its stroke.
  const landed = new Animation(new KeyframeEffect(root, [], { duration: duration * revealed }));
  const write = ink.animate([{ strokeDashoffset: '.98' }, { strokeDashoffset: '0' }], {
    duration: duration * written,
    easing: 'cubic-bezier(.22,.7,.24,1)',
    fill: 'both',
  });
  // From the middle of the screen, everything but the header waits hidden, so the page's own
  // background shows behind the ink wherever the visitor scrolls, even behind Safari's
  // see-through toolbars, and lifts as the ink flies home. From the hero, only its copy waits.
  const backdrop = fromScreen
    ? [...document.body.children].filter(
        // Parts hidden on their own, such as the back-to-top control at the top of the page (inert
        // and aria-hidden), keep their own opacity; fading them in would show them.
        (node): node is HTMLElement =>
          node instanceof HTMLElement &&
          !(node instanceof HTMLScriptElement) &&
          !node.contains(mark) &&
          !node.inert &&
          !node.hidden &&
          node.getAttribute('aria-hidden') !== 'true',
      )
    : [copy];
  const reveals = backdrop.map((node) =>
    node.animate(
      [
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: hold },
        { opacity: 1, offset: revealed },
        { opacity: 1, offset: 1 },
      ],
      { duration, fill: 'both' },
    ),
  );
  const animations = () => [travel, landed, write, ...reveals];

  const controller = new AbortController();
  const options = { signal: controller.signal };
  let frame = 0;
  const release = () => {
    controller.abort();
    cancelAnimationFrame(frame);
    for (const animation of animations()) animation.cancel();
    root.removeAttribute('data-signing-scope');
    for (const property of ['left', 'top', 'right', 'width', 'height', 'transform-origin'])
      mark.style.removeProperty(property);
  };
  const settle = () => {
    disarm();
    release();
  };

  // While the ink holds, a new screen width (a rotation, a resized window) re-centres it, at most
  // once a frame. Height-only changes, such as a phone's toolbar sliding away as the visitor
  // scrolls, leave the flight alone, so it never restarts mid-scroll. WebKit can keep running a
  // compositor animation's old keyframes after setKeyframes, so a fresh animation takes over at the
  // same moment instead. Once the ink is in flight it keeps its course; its slot-anchored landing
  // never moves.
  const retarget = () => {
    frame ||= requestAnimationFrame(() => {
      frame = 0;
      const time = Number(travel.currentTime ?? 0);
      if (time >= duration * hold || window.innerWidth === launch.width) return;
      const dock = slot.getBoundingClientRect();
      const box = takeoff(stage, dock, fromScreen);
      if (!box) return;
      const drift =
        Math.abs(box.left - dock.left - (launch.box.left - launch.dock.left)) +
        Math.abs(box.top - dock.top - (launch.box.top - launch.dock.top)) +
        Math.abs(box.width - launch.box.width);
      if (drift < 2) return;
      const running = travel.playState === 'running';
      travel.cancel();
      draw(box);
      travel = mark.animate(homeward(box, dock), { duration, fill: 'both' });
      travel.currentTime = time;
      if (!running) travel.pause();
      travel.addEventListener('finish', settle, options);
      launch = { box, dock, width: window.innerWidth };
    });
  };

  root.setAttribute('data-signing', 'flying');
  // Taps pass through what is hidden until it is visible again (globals.css).
  root.setAttribute('data-signing-scope', fromScreen ? 'screen' : 'hero');
  landed.play();
  landed.addEventListener('finish', () => root.setAttribute('data-signing', 'landing'), options);
  travel.addEventListener('finish', settle, options);
  preference.addEventListener('change', settle, options);
  window.addEventListener('resize', retarget, options);
  // A hidden page pauses the intro and picks it up where it left off when shown again. Only what
  // was still running resumes, so a finished stroke is not drawn again.
  let paused: Animation[] = [];
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'hidden') {
        paused = animations().filter((animation) => animation.playState === 'running');
        for (const animation of paused) animation.pause();
      } else {
        for (const animation of paused) animation.play();
        paused = [];
      }
    },
    options,
  );
  // The focus a click gives `<main>` is not focus-visible. Keyboard focus settles at once, so it
  // never lands on copy that cannot be seen yet.
  document.addEventListener(
    'focusin',
    (event) => {
      if (event.target instanceof Element && event.target.matches(':focus-visible')) settle();
    },
    options,
  );
  window.addEventListener('pagehide', settle, options);
  return release;
}
