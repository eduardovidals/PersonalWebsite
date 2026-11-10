import { expect, test, type Locator } from '@playwright/test';

const homeName = 'Eduardo Vidals, home';

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

async function sampleInk(home: Locator, time: { ms: number } | { fraction: number }) {
  return home.evaluate((link, time) => {
    const svg = link.querySelector('svg');
    const path = svg?.querySelector('path');
    const stage = document.querySelector('[data-signature-stage]');
    const flight = svg?.getAnimations()[0];
    if (!svg || !path || !stage || !flight?.effect) throw new Error('No live signature flight');
    const duration = Number(flight.effect.getTiming().duration);
    const ms = 'ms' in time ? time.ms : duration * time.fraction;
    for (const animation of svg.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = ms;
    }
    const box = (node: Element) => {
      const r = node.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, width: r.width, height: r.height };
    };
    const viewport = window.visualViewport;
    const width = viewport?.width ?? window.innerWidth;
    const height = viewport?.height ?? window.innerHeight;
    return {
      svg: box(svg),
      vectorWidth: svg.clientWidth,
      ink: box(path),
      inkVisible:
        svg.checkVisibility({ opacityProperty: true, visibilityProperty: true }) &&
        getComputedStyle(path).stroke !== 'none' &&
        Number.parseFloat(getComputedStyle(path).strokeDashoffset) < 0.02,
      stage: box(stage),
      dock: box(link),
      viewport: {
        x: (viewport?.offsetLeft ?? 0) + width / 2,
        y: (viewport?.offsetTop ?? 0) + height / 2,
        width,
        height,
      },
    };
  }, time);
}

for (const viewport of [
  { width: 320, height: 568, mobile: true },
  { width: 390, height: 844, mobile: true },
  { width: 844, height: 390, mobile: true },
  { width: 1280, height: 900, mobile: false },
]) {
  test(`visible ink holds at the ${viewport.mobile ? 'viewport' : 'hero-slot'} center before docking at ${viewport.width}×${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/', { waitUntil: 'commit' });
    const home = page.getByRole('banner').getByRole('link', { name: homeName });
    await expect(home).toHaveCount(1);
    await expect(home).toHaveAttribute('href', '/');
    await page.waitForFunction(
      () => !!document.querySelector('#ev-home-signature')?.getAnimations().length,
    );

    const hold = await sampleInk(home, { ms: 600 });
    const held = await sampleInk(home, { ms: 1050 });
    for (const sample of [hold, held]) {
      expect(sample.inkVisible, 'the handwritten stroke is visible and fully drawn').toBe(true);
      const mark = viewport.mobile ? sample.ink : sample.svg;
      const center = viewport.mobile ? sample.viewport : sample.stage;
      expect(Math.abs(mark.x - center.x), 'horizontal center').toBeLessThan(2);
      expect(Math.abs(mark.y - center.y), 'vertical center').toBeLessThan(2);
      expect(sample.ink.x - sample.ink.width / 2).toBeGreaterThanOrEqual(0);
      expect(sample.ink.y - sample.ink.height / 2).toBeGreaterThanOrEqual(0);
      expect(sample.ink.x + sample.ink.width / 2).toBeLessThanOrEqual(viewport.width);
      expect(sample.ink.y + sample.ink.height / 2).toBeLessThanOrEqual(viewport.height);
    }
    expect(distance(hold.ink, held.ink)).toBeLessThan(1);
    expect(Math.abs(hold.ink.width - held.ink.width)).toBeLessThan(1);
    const middle = await sampleInk(home, { fraction: 0.72 });
    const end = await sampleInk(home, { fraction: 0.999 });
    // At full size and in flight, paint the SVG at its displayed width, not at header resolution.
    for (const frame of [held, middle, end]) {
      expect(Math.abs(frame.vectorWidth - frame.svg.width)).toBeLessThan(1);
    }
    expect(held.svg.width).toBeGreaterThan(end.svg.width * 2);
    expect(middle.svg.width).toBeLessThan(held.svg.width - 3);
    expect(middle.svg.width).toBeGreaterThan(end.svg.width + 3);
    expect(distance(middle.svg, held.svg)).toBeGreaterThan(12);
    expect(distance(middle.svg, end.dock)).toBeGreaterThan(12);
    expect(distance(end.svg, end.dock)).toBeLessThan(2);
    const headerLeft = await page.getByRole('banner').evaluate((header) => {
      // The sticky header spans the page; its inner container holds the page gutter.
      const shell = header.firstElementChild ?? header;
      return shell.getBoundingClientRect().left + parseFloat(getComputedStyle(shell).paddingLeft);
    });
    expect(Math.abs(end.dock.x - end.dock.width / 2 - headerLeft)).toBeLessThan(2);
    expect(end.dock.y).toBeLessThan(85);
    await home.locator('svg').evaluate((mark) => mark.getAnimations()[0]?.finish());
    await expect(page.locator('[data-signature-resting]')).toHaveCSS('opacity', '1');
    await expect
      .poll(() => home.locator('svg').evaluate((ink) => ink.getAnimations().length))
      .toBe(0);
  });
}

test('rotating a phone during the hold keeps the ink centered in the new viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'commit' });
  await page.waitForFunction(
    () => !!document.querySelector('#ev-home-signature')?.getAnimations().length,
  );
  const home = page.getByRole('banner').getByRole('link', { name: homeName });
  await sampleInk(home, { ms: 600 });
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForFunction(() => {
    const r = document.querySelector('#ev-home-signature path')?.getBoundingClientRect();
    return (
      !!r &&
      Math.abs(r.left + r.width / 2 - window.innerWidth / 2) < 2 &&
      Math.abs(r.top + r.height / 2 - window.innerHeight / 2) < 2
    );
  });
  const held = await sampleInk(home, { ms: 800 });
  expect(distance(held.ink, held.viewport)).toBeLessThan(2);
});

test('preferring reduced motion keeps the link docked and the resting hero readable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-signature-resting]')).toHaveCSS('opacity', '1');
  const home = page.getByRole('banner').getByRole('link', { name: homeName });
  await expect(home.locator('svg')).toHaveCSS('transform', 'none');
  await home.focus();
  await expect(home).toBeFocused();
});

test('a deep link does not start the flight on a scrolled visit', async ({ page }) => {
  await page.goto('/#about');
  await expect(page.locator('[data-signature-resting]')).toHaveCSS('opacity', '1');
  await expect(page.locator('#ev-home-signature')).toHaveCSS('transform', 'none');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('content reads normally and the left-hand logo links home from other routes', async ({
    page,
  }) => {
    await page.goto('/');
    const resting = page.locator('[data-signature-resting]');
    await expect(resting).toBeVisible();
    await expect(resting).toHaveCSS('opacity', '1');
    await expect(resting).toContainText(/\S/);
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await nav.getByRole('link', { name: 'About' }).click();
    const home = page.getByRole('banner').getByRole('link', { name: homeName });
    await expect(home.locator('svg')).toBeVisible();
    await home.press('Enter');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[data-signature-stage]')).toBeVisible();
  });
});
