import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('every indexed page is a real, canonical HTML document', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => new URL(match[1]));
  const paths = urls.map((url) => url.pathname);
  expect(paths).toEqual(
    expect.arrayContaining([
      '/',
      '/blog/',
      '/projects/',
      ...[
        'props',
        'benev',
        'sorting-visualizer',
        '3d-sorting-visualizer',
        'pathfinding-visualizer',
        'solar-system',
      ].map((slug) => '/projects/' + slug + '/'),
    ]),
  );
  const titles = new Set<string>();
  for (const url of urls) {
    expect(url.origin).toBe('https://www.eduardovidals.com');
    const response = await request.get(url.pathname);
    expect(response.status(), url.pathname).toBe(200);
    const html = await response.text();
    expect(html, url.pathname).toContain('rel="canonical" href="' + url.href + '"');
    expect(html.match(/<h1\b/g), url.pathname).toHaveLength(1);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    expect(title, url.pathname).toBeTruthy();
    titles.add(title ?? '');
  }
  expect(titles.size).toBe(urls.length);
  const feed = await (await request.get('/feed.xml')).text();
  for (const post of urls.filter(
    (url) => url.pathname.startsWith('/blog/') && url.pathname !== '/blog/',
  )) {
    expect(feed).toContain(post.href);
  }
  expect((await request.get('/not-a-project/')).status()).toBe(404);
});

test('a reader can navigate to a full article without JavaScript', async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  try {
    await page.goto('http://127.0.0.1:4173/');
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Blog' })
      .click();
    await page.locator('main ol a').first().click();
    await expect(page.locator('article h1')).toBeVisible();
    await expect(page.locator('article time')).toBeVisible();
  } finally {
    await page.close();
  }
});

test('keyboard replay respects reduced motion and contact remains reachable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const replay = page.getByRole('button', { name: 'Replay trace' });
  await replay.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status').filter({ hasText: 'Shortest route' })).toContainText(
    'Replay 1',
  );
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: /Contact/ })
    .click();
  await expect(page.locator('a[href^="mailto:"]').first()).toBeInViewport();
});

test('small screens fit the page and core templates have accessible semantics', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    '/',
    '/projects/',
    '/projects/benev/',
    '/blog/',
    '/blog/the-search-is-not-the-path/',
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      path,
    ).toBeLessThanOrEqual(375);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      violations.map((issue) => ({ id: issue.id, nodes: issue.nodes.map((node) => node.target) })),
      path,
    ).toEqual([]);
  }
});
