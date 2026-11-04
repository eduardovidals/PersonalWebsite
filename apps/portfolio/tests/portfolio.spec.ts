import { expect, test, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects } from '../src/content/projects';
import { currentWork } from '../src/content/projects/current-work';
import { toolMarks } from '../src/content/tools/marks';

const greeting = 'Hey, I’m Eduardo.';
const typingControls = /^(Pause|Resume|Replay) typing$/;

async function expectToolMarks(items: Locator, symbolIds: string[]) {
  // Check the served symbol and its rendered geometry, not just the presence of an SVG tag.
  await expect
    .poll(() =>
      items.evaluateAll(
        (chips, ids) =>
          chips.flatMap((chip) => {
            const svg = chip.querySelector('svg');
            const use = svg?.querySelector('use');
            const href = use?.getAttribute('href');
            const bounds = use?.getBBox();
            const id = href?.match(/^\/tool-marks\.svg#([^#]+)$/)?.[1];
            const valid =
              chip.matches('li:not([tabindex])') &&
              !chip.querySelector('button, a[href], [tabindex]') &&
              svg?.getAttribute('aria-hidden') === 'true' &&
              id &&
              ids.includes(id) &&
              bounds &&
              bounds.width > 0 &&
              bounds.height > 0;
            return valid ? [] : [chip.textContent?.trim()];
          }),
        symbolIds,
      ),
    )
    .toEqual([]);
}

test('every indexed page is a real, canonical HTML document', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => new URL(match[1]));
  const paths = urls.map((url) => url.pathname);
  expect(paths).toEqual(
    expect.arrayContaining([
      '/',
      '/about/',
      '/blog/',
      '/projects/',
      '/projects/software-factory/',
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
  const feedItems = Array.from(
    feed.matchAll(/<item>([\s\S]*?)<\/item>/g),
    (item) => item[1].match(/<link>([^<]+)<\/link>/)?.[1],
  );
  const posts = urls.filter(
    (url) => url.pathname.startsWith('/blog/') && url.pathname !== '/blog/',
  );
  expect(feedItems.sort()).toEqual(posts.map((url) => url.href).sort());
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
    await page.getByRole('link', { name: 'How I got here' }).click();
    const journey = page.getByRole('list', { name: 'Career timeline' });
    await expect(journey.getByRole('heading')).toHaveText([
      'Smarttwigs',
      'PGIM',
      'PGIM',
      'Prudential Financial',
    ]);
    await expect(journey.getByRole('listitem').last()).toContainText('Mar 2026 – Present');
    await expect(
      page.getByRole('group', { name: 'Role animation' }).locator('[aria-hidden="true"]').first(),
    ).toHaveText('Software Engineer.');
    await expect(page.getByRole('button', { name: typingControls })).toHaveCount(0);
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Eduardo Vidals — home' }),
    ).toHaveAttribute('href', '/');
    const toolkit = page.getByRole('region', { name: 'My toolkit' });
    const everyday = toolkit.getByRole('list', { name: 'Everyday tools', exact: true });
    await expect(
      everyday.getByRole('listitem').filter({ hasText: /^TanStack Query$/ }),
    ).toBeVisible();
    await expect(everyday.getByRole('listitem').filter({ hasText: /^Redux$/ })).toBeVisible();
    await expect(everyday.getByRole('button').or(everyday.getByRole('link'))).toHaveCount(0);
    const api = toolkit.getByText('APIs & storage', { exact: true });
    await expect(everyday.getByRole('listitem').filter({ hasText: /^Kysely$/ })).toBeVisible();
    const prisma = toolkit.getByRole('listitem').filter({ hasText: /^Prisma$/ });
    const more = toolkit.locator('details > summary');
    await expect(api).toBeHidden();
    await expect(prisma).toBeHidden();
    await more.press('Enter');
    await expect(api).toBeVisible();
    await expect(prisma).toBeVisible();
    await expect(more).toBeFocused();
    await more.press('Space');
    await expect(api).toBeHidden();
    await expect(prisma).toBeHidden();
    await expect(everyday).toBeVisible();
    const primaryNav = page.getByRole('navigation', { name: 'Primary' });
    await primaryNav.getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'From design systems to Software Factory',
    );
    await primaryNav.getByRole('link', { name: 'Blog' }).click();
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

test('the homepage featured project opens the Software Factory case study', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Why I’m building Software Factory', exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/software-factory\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Software Factory');
});

test('every project has a working image and selects the intended phone or desktop view', async ({
  page,
}) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/projects/');
    const cards = page.getByRole('article');
    await expect(cards).toHaveCount(currentWork.length + projects.length);
    for (const card of await cards.all()) {
      const img = card.getByRole('img').first();
      await img.scrollIntoViewIfNeeded();
      const source = await img.evaluate(async (image) => {
        if (!(image instanceof HTMLImageElement)) throw new Error('Project image is missing.');
        await image.decode();
        return new URL(image.currentSrc).pathname;
      });
      const title = (await card.getByRole('heading').innerText()).replace('↗', '').trim();
      const work = currentWork.find((item) => item.title === title);
      if (work) {
        const suffix =
          work.visual.kind === 'illustration' ? '.svg' : width < 640 ? '-small.webp' : '-wide.webp';
        expect(source, title).toBe('/work/current/' + work.id + suffix);
        if (work.visual.kind === 'illustration')
          await expect(card.locator('figcaption')).toContainText('illustration');
      } else {
        const project = projects.find((item) => item.title === title);
        expect(project, title).toBeDefined();
        expect(source, title).toBe(
          '/work/' + ((width < 640 && project?.smallCover) || project?.cover) + '.webp',
        );
      }
    }
  }
});

test('technology chips resolve to local marks and preserve each project’s own stack', async ({
  page,
}) => {
  const sprite = await page.goto('/tool-marks.svg');
  expect(sprite?.ok()).toBe(true);
  const symbols = await page
    .locator('svg symbol[id]')
    .evaluateAll((nodes) => nodes.map((node) => node.id));
  expect(symbols.length).toBeGreaterThan(0);

  await page.goto('/');
  const toolkit = page.getByRole('region', { name: 'My toolkit' });
  await toolkit.locator('details > summary').press('Enter');
  const aiTools = toolkit
    .getByRole('list', { name: 'AI tools', exact: true })
    .getByRole('listitem');
  await expect(aiTools.filter({ hasText: /^Claude Code$/ })).toBeVisible();
  await expect(aiTools.filter({ hasText: /^Codex$/ })).toBeVisible();
  expect((await toolkit.getByRole('listitem').allTextContents()).sort()).toEqual(
    Object.keys(toolMarks).sort(),
  );
  await expectToolMarks(toolkit.getByRole('listitem'), symbols);

  async function checkProject(project: (typeof projects)[number]) {
    const items = page
      .getByRole('list', { name: 'Tools used on ' + project.title, exact: true })
      .getByRole('listitem');
    await expect(items).toHaveText([...project.stack]);
    await expect(items.filter({ hasText: /^(Claude Code|Codex)$/ })).toHaveCount(0);
    if (project.slug === 'props') {
      await expect(items.filter({ hasText: /^Redux$/ })).toBeVisible();
      await expect(items.filter({ hasText: /^Stripe$/ })).toBeVisible();
    } else if (project.slug === 'solar-system') {
      await expect(items.filter({ hasText: /^Three\.js$/ })).toBeVisible();
    }
    await expectToolMarks(items, symbols);
  }
  await page.getByText('Browse six early projects and demos', { exact: true }).press('Enter');
  for (const project of projects) await checkProject(project);
  await page.goto('/projects/');
  for (const work of currentWork) {
    const article = page.getByRole('article', { name: work.title, exact: true });
    await article.locator('summary').press('Enter');
    for (const [label, tools] of [
      [`Tools used on ${work.title}`, work.stack],
      ...(work.ai ?? []).map(({ kind, tools }) => [`${kind} on ${work.title}`, tools] as const),
    ] as const) {
      const chips = article.getByRole('list', { name: label, exact: true }).getByRole('listitem');
      await expect(chips).toHaveText([...tools]);
      await expectToolMarks(chips, symbols);
    }
  }
  for (const project of projects) await checkProject(project);
  for (const project of projects) {
    await page.goto('/projects/' + project.slug + '/');
    await checkProject(project);
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
  await page.getByText('Browse six early projects and demos', { exact: true }).press('Enter');
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
    '/about/',
    '/projects/',
    '/projects/benev/',
    '/projects/software-factory/',
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
