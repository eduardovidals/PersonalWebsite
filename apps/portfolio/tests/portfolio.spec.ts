import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const greeting = 'Hey, I’m Eduardo.';
const typingControls = /^(Pause|Resume|Replay) typing$/;

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

test('the greeting, toolkit, navigation and full blog posts work without JavaScript', async ({
  browser,
}) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  try {
    await page.goto('http://127.0.0.1:4173/');
    const heading = page.getByRole('heading', { level: 1, name: greeting, exact: true });
    await expect(heading).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'Role animation' }).locator('[aria-hidden="true"]').first(),
    ).toHaveText('Software Engineer.');
    await expect(page.getByRole('button', { name: typingControls })).toHaveCount(0);
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Eduardo Vidals — home' }),
    ).toHaveAttribute('href', '/');
    const toolkit = page.getByRole('region', { name: 'My toolkit' });
    const stateTools = toolkit.getByRole('list', { name: 'Tools for Routing, data & state' });
    await expect(stateTools).toContainText('TanStack Query');
    await expect(stateTools).toContainText('Redux');
    const api = toolkit.getByText('APIs & storage', { exact: true });
    await expect(api).toBeHidden();
    await toolkit.locator('summary').press('Enter');
    await expect(api).toBeVisible();
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Blog' })
      .click();
    await expect(page.getByRole('heading', { level: 1, name: 'Blog', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'The search is not the path' }).click();
    await expect(
      page.getByRole('heading', { level: 1, name: 'The search is not the path' }),
    ).toBeVisible();
    await expect(page.locator('article time')).toBeVisible();
  } finally {
    await page.close();
  }
});

test('keyboard control pauses, resumes and replays one finite typing sequence', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install({ time: new Date('2026-01-10T10:00:00Z') });
  await page.clock.pauseAt(new Date('2026-01-10T10:01:00Z'));
  await page.goto('/');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveAccessibleName(greeting);
  // Keep a reference to the changing visual node, not its initial text.
  const visual = page
    .getByRole('group', { name: 'Role animation' })
    .locator('p [aria-hidden="true"]');
  await expect(visual).toHaveText('Software Engineer.');
  const pause = page.getByRole('button', { name: 'Pause typing', exact: true });
  const resume = page.getByRole('button', { name: 'Resume typing', exact: true });
  const replay = page.getByRole('button', { name: 'Replay typing', exact: true });
  await pause.press('Enter');
  await expect(resume).toBeFocused();
  await page.clock.runFor(5_000);
  await expect(visual).toHaveText('Software Engineer.');
  await expect(resume).toBeFocused();
  await resume.press('Space');

  const sequence = ['Software Engineer.'];
  const originalRoles = new Set(['Software Engineer.', 'Developer.', 'Programmer.']);
  let sawPartial = false;
  // Sample often enough to see the holds without coupling the test to the exact typing speed.
  for (let elapsed = 0; elapsed < 30_000 && !(await replay.isVisible()); elapsed += 200) {
    await page.clock.runFor(200);
    const word = (await visual.textContent())?.trim() ?? '';
    if (originalRoles.has(word)) {
      if (sequence.at(-1) !== word) sequence.push(word);
    } else if (word) {
      if (!sawPartial) await expect(heading).toHaveAccessibleName(greeting);
      sawPartial = true;
    }
  }
  expect(sawPartial).toBe(true);
  expect(sequence).toEqual([
    'Software Engineer.',
    'Developer.',
    'Programmer.',
    'Software Engineer.',
  ]);
  await expect(replay).toBeVisible();
  await page.clock.runFor(30_000);
  await expect(replay).toBeVisible();
  await expect(visual).toHaveText('Software Engineer.');
  await replay.press('Enter');
  await expect(pause).toBeFocused();
  // The page must start typing again, not just relabel the replay button.
  for (
    let elapsed = 0;
    elapsed < 5_000 && (await visual.textContent())?.trim() === 'Software Engineer.';
    elapsed += 200
  ) {
    await page.clock.runFor(200);
  }
  await expect(visual).not.toHaveText('Software Engineer.');
  await expect(heading).toHaveAccessibleName(greeting);
});

test('reduced motion keeps the greeting still; keyboard demo and contact remain reachable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveAccessibleName(greeting);
  const role = page
    .getByRole('group', { name: 'Role animation' })
    .locator('p [aria-hidden="true"]');
  await expect(role).toBeVisible();
  await expect(role).toHaveText('Software Engineer.');
  await expect(page.getByRole('button', { name: typingControls })).toHaveCount(0);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const replay = page.getByRole('button', { name: 'Replay trace' });
  await expect(replay).toBeHidden();
  const disclosure = page
    .locator('details > summary')
    .filter({ hasText: 'Try the pathfinding demo' });
  await disclosure.press('Enter');
  await expect(replay).toBeVisible();
  await replay.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status').filter({ hasText: 'Shortest route' })).toContainText(
    'Replay 1',
  );
  await expect(heading).toHaveAccessibleName(greeting);
  await expect(role).toHaveText('Software Engineer.');
  await expect(page.getByRole('button', { name: typingControls })).toHaveCount(0);
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
