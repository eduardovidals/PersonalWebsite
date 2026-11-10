import { expect, test, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects } from '../src/content/projects';
import { currentWork } from '../src/content/projects/current-work';
import { toolMarks } from '../src/content/tools/marks';
import en from '../src/i18n/messages/en';

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
    // Names like "Props" stay the same in every language, so titles are unique per language.
    const language = url.pathname.match(/^\/(es|ar|vi)\//)?.[1] ?? 'en';
    titles.add(language + ' ' + (title ?? ''));
  }
  expect(titles.size).toBe(urls.length);
  expect(urls).toHaveLength(4 * 10);
  expect((await request.get('/not-a-project/')).status()).toBe(404);
});

test('the greeting, toolkit, navigation and project stories work without JavaScript', async ({
  browser,
}) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  try {
    await page.goto('http://127.0.0.1:4173/');
    const heading = page.getByRole('heading', { level: 1, name: greeting, exact: true });
    await expect(heading).toBeVisible();
    await page.goto('http://127.0.0.1:4173/#about');
    const journey = page.getByRole('list', { name: 'Career timeline' });
    await expect(journey.getByRole('heading')).toHaveText([
      'Smarttwigs',
      'PGIM',
      'PGIM',
      'Prudential Financial',
    ]);
    await expect(journey.getByRole('listitem').last()).toContainText('Mar 2026 – Present');
    await expect(journey.getByRole('listitem').last()).toContainText('Prudential’s Design System');
    await expect(
      page.getByRole('group', { name: 'Role animation' }).locator('[aria-hidden="true"]').first(),
    ).toHaveText('Software Engineer');
    await expect(page.getByRole('button', { name: typingControls })).toHaveCount(0);
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Eduardo Vidals, home' }),
    ).toHaveAttribute('href', '/');
    const toolkit = page.getByRole('region', { name: 'Toolkit' });
    const everyday = toolkit.getByRole('list', { name: 'Everyday tools', exact: true });
    await expect(
      everyday.getByRole('listitem').filter({ hasText: /^TanStack Query$/ }),
    ).toBeVisible();
    await expect(everyday.getByRole('listitem').filter({ hasText: /^Redux$/ })).toBeVisible();
    await expect(everyday.getByRole('button').or(everyday.getByRole('link'))).toHaveCount(0);
    const api = toolkit.getByText('APIs & Storage', { exact: true });
    await expect(everyday.getByRole('listitem').filter({ hasText: /^Kysely$/ })).toBeVisible();
    // Disclosures cannot toggle without JavaScript, so their panels stay open and triggers hide.
    // React Aria still renders the closed panel as aria-hidden, so check what a sighted reader sees.
    const prisma = toolkit.getByText('Prisma', { exact: true });
    await expect(api).toBeVisible();
    await expect(prisma).toBeVisible();
    await expect(toolkit.getByRole('button', { name: /^(More|Fewer) tools$/ })).toBeHidden();
    await expect(everyday).toBeVisible();
    const primaryNav = page.getByRole('navigation', { name: 'Primary' });
    await primaryNav.getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('My Story');
    await primaryNav.getByRole('link', { name: 'Work' }).click();
    await expect(
      page.getByRole('heading', { level: 1, name: 'Projects', exact: true }),
    ).toBeVisible();
    await page.goto('http://127.0.0.1:4173/projects/software-factory/');
    await expect(page.getByRole('heading', { level: 2, name: 'Why Every Business' })).toBeVisible();
  } finally {
    await page.close();
  }
});

test('the homepage featured project opens the Velton case study', async ({ page }) => {
  await page.goto('/');
  const feature = page.getByRole('article', { name: 'Velton', exact: true });
  await expect(feature).toContainText('custom software that small businesses fully own');
  await expect(feature.locator('img')).toHaveCount(1);
  await page.getByRole('link', { name: 'Why I founded Velton', exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/software-factory\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Velton');
  await expect(page.locator('main img')).toHaveCount(0);
});

test('project images preserve their subjects and link to the appropriate full capture; Factory stays text-only', async ({
  page,
}) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/projects/');
    const cards = page.getByRole('article');
    await expect(cards).toHaveCount(currentWork.length + projects.length);
    await expect(cards.first().getByRole('heading')).toContainText('Velton');
    for (const card of await cards.all()) {
      const title = (await card.getByRole('heading').innerText()).replace('→', '').trim();
      const work = currentWork.find((item) => en.projects.work[item.id].title === title);
      const img = card.getByRole('img').first();
      await img.scrollIntoViewIfNeeded();
      const source = await img.evaluate(async (image) => {
        if (!(image instanceof HTMLImageElement)) throw new Error('Project image is missing.');
        await image.decode();
        return new URL(image.currentSrc).pathname;
      });
      if (work) {
        const suffix =
          work.visual.kind === 'illustration'
            ? '.svg'
            : width < 1024
              ? '-detail.webp'
              : '-wide.webp';
        expect(source, title).toBe('/work/current/' + work.id + suffix);
        if (work.visual.kind === 'illustration')
          await expect(card.locator('figcaption')).toContainText(en.projects.work[work.id].caption);
        else {
          const full = card.getByRole('link', { name: /^Full (phone|desktop) screenshot of/ });
          const href = '/work/current/' + work.id + (width < 1024 ? '-small.webp' : '-wide.webp');
          await expect(full).toHaveAttribute('href', href);
          expect((await page.request.get(href)).headers()['content-type']).toContain('image/webp');
        }
        const error = await img.evaluate((el) => {
          if (!(el instanceof HTMLImageElement))
            throw new Error('Expected a photograph or illustration');
          const box = el.getBoundingClientRect();
          return Math.abs(box.height - (box.width * el.naturalHeight) / el.naturalWidth);
        });
        expect(error, title + ': the selected image must not be cropped or squashed').toBeLessThan(
          1,
        );
      } else {
        const project = projects.find((item) => en.projects.items[item.slug].title === title);
        expect(project, title).toBeDefined();
        expect(source, title).toBe(
          '/work/' +
            (project?.slug === 'props' ? 'props-signup' : (project?.preview ?? project?.cover)) +
            '.webp',
        );
      }
    }
  }
});

test('project filters narrow the list without changing the order or losing the full gallery', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/projects/');
  const cards = page.getByRole('article');
  const chooser = page.getByRole('button', { name: /Show/ });
  await expect(cards.first().getByRole('heading')).toContainText('Velton');
  for (const [label, count, first] of [
    ['Career', 6, 'Prudential Design System'],
    ['Personal', 6, 'Yni Anniversary'],
    ['Business', 1, 'Velton'],
    ['All Projects', 13, 'Velton'],
  ] as const) {
    await chooser.focus();
    await chooser.press('Enter');
    const option = page.getByRole('option', { name: label, exact: true });
    await option.click();
    await expect(chooser).toBeFocused();
    await expect(cards).toHaveCount(count);
    await expect(cards.first().getByRole('heading')).toContainText(first);
    await expect(page.getByRole('status')).toHaveText(
      count + (count === 1 ? ' project' : ' projects'),
    );
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
  const toolkit = page.getByRole('region', { name: 'Toolkit' });
  await toolkit.getByRole('button', { name: 'More tools' }).press('Enter');
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
      .getByRole('list', {
        name: 'Tools used on ' + en.projects.items[project.slug].title,
        exact: true,
      })
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
  await page.getByRole('button', { name: 'Early projects (6)' }).press('Enter');
  for (const project of projects) await checkProject(project);
  await page.goto('/projects/');
  for (const work of currentWork) {
    const title = en.projects.work[work.id].title;
    const article = page.getByRole('article', { name: title, exact: true });
    await article.getByRole('button', { name: en.projects.page.notes }).press('Enter');
    for (const [label, tools] of [
      [`Tools used on ${title}`, work.stack],
      ...(work.ai ?? []).map(
        ({ kind, tools }) => [`${en.projects.aiKinds[kind]} on ${title}`, tools] as const,
      ),
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

test('the roles loop automatically and keyboard controls pause and resume typing', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install({ time: new Date('2026-01-10T10:00:00Z') });
  await page.clock.pauseAt(new Date('2026-01-10T10:01:00Z'));
  await page.goto('/');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveAccessibleName(greeting);
  const group = page.getByRole('group', { name: 'Role animation' });
  const paragraph = group.getByRole('paragraph');
  const visual = paragraph.locator('[aria-hidden="true"]');
  await expect(visual).toHaveText('Software Engineer');
  const pause = page.getByRole('button', { name: 'Pause typing', exact: true });
  const resume = page.getByRole('button', { name: 'Resume typing', exact: true });
  await expect(pause).toBeVisible();
  const roles = ['Software Engineer', 'Developer', 'Programmer'];
  const expected = [...roles, ...roles, roles[0]];
  const sequence = [roles[0]];
  let pausedMidWord = false;
  // Sample often enough to see the holds without coupling the test to the exact typing speed.
  for (let elapsed = 0; elapsed < 90_000 && sequence.length < expected.length; elapsed += 200) {
    await page.clock.runFor(200);
    const word = (await visual.textContent())?.trim() ?? '';
    if (roles.includes(word)) {
      if (sequence.at(-1) !== word) sequence.push(word);
    } else if (word && !pausedMidWord) {
      await pause.press('Enter');
      await expect(resume).toBeFocused();
      await page.clock.runFor(5_000);
      await expect(visual).toHaveText(word);
      await expect(paragraph).toMatchAriaSnapshot('- paragraph: Software Engineer');
      await expect(heading).toHaveAccessibleName(greeting);
      await resume.press('Space');
      await expect(pause).toBeFocused();
      pausedMidWord = true;
    }
  }
  expect(pausedMidWord).toBe(true);
  expect(sequence).toEqual(expected);
  await expect(pause).toBeFocused();
  await expect(heading).toHaveAccessibleName(greeting);
});

test('reduced motion keeps the greeting still; keyboard demo and contact remain reachable', async ({
  page,
  browserName,
}) => {
  // Safari on macOS moves between links with Option+Tab unless "Press Tab to highlight each item"
  // is on. WebKit on Linux, as in CI, moves between links with Tab.
  const nextLink = browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab';
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveAccessibleName(greeting);
  const role = page
    .getByRole('group', { name: 'Role animation' })
    .locator('p [aria-hidden="true"]');
  await expect(role).toBeVisible();
  await expect(role).toHaveText('Software Engineer');
  await expect(page.getByRole('button', { name: typingControls })).toHaveCount(0);
  await page.keyboard.press(nextLink);
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const replay = page.getByRole('button', { name: 'Replay trace' });
  await expect(replay).toBeHidden();
  await page.getByRole('button', { name: 'Early projects (6)' }).press('Enter');
  const disclosure = page.getByRole('button', { name: 'Try the pathfinding demo' });
  await disclosure.press('Enter');
  await expect(replay).toBeVisible();
  await replay.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status').filter({ hasText: 'Shortest route' })).toContainText(
    'Replay 1',
  );
  await expect(heading).toHaveAccessibleName(greeting);
  await expect(role).toHaveText('Software Engineer');
  await expect(page.getByRole('button', { name: typingControls })).toHaveCount(0);
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: /Contact/ })
    .click();
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeInViewport();
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
