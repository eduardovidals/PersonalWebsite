/** Where a same-site link should go, relative to the page the reader is on. */
export type Destination =
  { kind: 'top' } | { kind: 'fragment'; href: string } | { kind: 'route'; path: string };

/** Classifies a link press: the current page scrolls to its top, a fragment on this page jumps
 * natively, and everything else is a route change for Next's router. */
export function destinationFor(href: string, current: Location): Destination {
  const target = new URL(href, current.href);
  const samePage = target.pathname === current.pathname && target.search === current.search;
  if (samePage && !target.hash) return { kind: 'top' };
  if (samePage) return { kind: 'fragment', href: target.href };
  return { kind: 'route', path: target.pathname + target.search + target.hash };
}

/** Returns to the top of the current page without a navigation, and drops any section hash. */
export function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  if (window.location.hash) {
    window.history.replaceState(window.history.state, '', window.location.pathname);
  }
}

/** Jumps to a fragment on this page the way the browser does, then focuses the target when it is
 * focusable (such as `<main tabindex="-1">` behind the skip link) so keyboard users continue there. */
export function jumpToFragment(href: string) {
  window.location.assign(href);
  const id = decodeURIComponent(new URL(href).hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  if (target?.hasAttribute('tabindex')) target.focus({ preventScroll: true });
}
