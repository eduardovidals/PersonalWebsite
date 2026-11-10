/** Whether a header link points at the page the reader is on (`page`) or one of its children
 * (`location`), comparing paths without their trailing slash. */
export function currentFor(pathname: string, href: string): 'page' | 'location' | undefined {
  const here = pathname.replace(/\/$/, '') || '/';
  const destination = href.replace(/\/$/, '') || '/';
  if (here === destination) return 'page';
  if (destination !== '/' && here.startsWith(destination + '/')) return 'location';
  return undefined;
}
