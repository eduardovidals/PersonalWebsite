/**
 * Runs as an inline script before the homepage paints, so it must not reference anything outside
 * its own body. Marks a fresh homepage load that will play the intro, so the first frame already
 * hides the hero and the header ink instead of showing the copy and then taking it away.
 */
export function armSignature(home: string) {
  try {
    if (
      location.pathname === home &&
      !location.hash &&
      document.visibilityState !== 'hidden' &&
      typeof Element.prototype.animate === 'function' &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      document.documentElement.setAttribute('data-signing', 'armed');
  } catch {
    // The intro simply does not run.
  }
}
