import { useEffect } from 'react';
import type { VidalsPressRippleProps as Props } from './types.js';

function rippleTarget(target: EventTarget | null, selector: string) {
  return target instanceof Element ? target.closest<HTMLElement>(selector) : null;
}

/**
 * Adds ink that spreads from the press point (or the center for a keyboard press) inside `target`.
 * @example
 * ```ts
 * spawnRipple(card, event.offsetX, event.offsetY);
 * ```
 */
export function spawnRipple(target: HTMLElement, x: number, y: number) {
  const box = target.getBoundingClientRect();
  const size = Math.hypot(Math.max(x, box.width - x), Math.max(y, box.height - y)) * 2;
  const ink = document.createElement('span');
  ink.setAttribute('aria-hidden', 'true');
  ink.className = 'press-ripple';
  ink.style.width = ink.style.height = `${size}px`;
  ink.style.left = `${x - size / 2}px`;
  ink.style.top = `${y - size / 2}px`;
  target.append(ink);
  ink.addEventListener('animationend', () => ink.remove(), { once: true });
  return ink;
}

/**
 * Mount once per document. One delegated listener shows press feedback on every `[data-ripple]`
 * element; the `.press-ripple` styles live in `@vidals/tailwind-theme`.
 * @example
 * ```tsx
 * <VidalsPressRipple />
 * ```
 */
export function VidalsPressRipple(props: Props) {
  const { selector = '[data-ripple]' } = props;

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (event.button !== 0) return;
      const target = rippleTarget(event.target, selector);
      if (!target) return;
      const box = target.getBoundingClientRect();
      spawnRipple(target, event.clientX - box.left, event.clientY - box.top);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
      const target = rippleTarget(event.target, selector);
      if (!target) return;
      const box = target.getBoundingClientRect();
      spawnRipple(target, box.width / 2, box.height / 2);
    }
    // Capture phase: React Aria stops press events from bubbling, so a bubbling listener never sees them.
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [selector]);
  return null;
}
