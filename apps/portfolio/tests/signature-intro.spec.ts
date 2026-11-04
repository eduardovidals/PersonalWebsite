import { expect, test } from '@playwright/test';

const homeName = 'Eduardo Vidals — home';

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1280, height: 900 },
]) {
  test(`the same ink travels from the hero into the top-right home link at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/', { waitUntil: 'commit' });
    const home = page.getByRole('banner').getByRole('link', { name: homeName });
    await expect(home).toHaveCount(1);
    await expect(home).toHaveAttribute('href', '/');
    await page.waitForFunction(
      () => !!document.querySelector('#ev-home-signature')?.getAnimations().length,
    );

    // Seek the browser's actual transform. A timed replacement/crossfade at two locations cannot pass.
    const flight = await home.evaluate((link) => {
      const mark = link.querySelector('svg');
      const stage = document.querySelector('[data-signature-stage]');
      if (!mark || !stage) throw new Error('Missing signature or hero stage');
      const animation = mark.getAnimations()[0];
      if (!animation?.effect) throw new Error('The signature did not start its flight');
      animation.pause();
      const geometry = (node: Element) => {
        const r = node.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2, width: r.width };
      };
      const duration = Number(animation.effect.getTiming().duration);
      const at = (fraction: number) => {
        animation.currentTime = duration * fraction;
        return geometry(mark);
      };
      const result = {
        origin: geometry(stage),
        dock: geometry(link),
        start: at(0.15),
        middle: at(0.65),
        end: at(0.999),
      };
      animation.finish();
      return result;
    });
    const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      Math.hypot(a.x - b.x, a.y - b.y);
    expect(distance(flight.start, flight.origin)).toBeLessThan(2);
    expect(flight.start.width).toBeGreaterThan(flight.end.width * 2);
    expect(flight.middle.width).toBeLessThan(flight.start.width - 3);
    expect(flight.middle.width).toBeGreaterThan(flight.end.width + 3);
    expect(distance(flight.middle, flight.start)).toBeGreaterThan(12);
    expect(distance(flight.middle, flight.dock)).toBeGreaterThan(12);
    expect(distance(flight.end, flight.dock)).toBeLessThan(2);
    expect(flight.dock.x).toBeGreaterThan(viewport.width * 0.85);
    expect(flight.dock.y).toBeLessThan(85);
    await expect(page.locator('[data-signature-resting]')).toHaveCSS('opacity', '1');
    await expect
      .poll(() => home.locator('svg').evaluate((ink) => ink.getAnimations().length))
      .toBe(0);
  });
}

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
  test('content reads normally and the right-hand logo links home from other routes', async ({
    page,
  }) => {
    await page.goto('/');
    const resting = page.locator('[data-signature-resting]');
    await expect(resting).toBeVisible();
    await expect(resting).toHaveCSS('opacity', '1');
    await expect(resting).toContainText(/\S/);
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await nav.getByRole('link', { name: 'Blog' }).click();
    const home = page.getByRole('banner').getByRole('link', { name: homeName });
    await expect(home.locator('svg')).toBeVisible();
    await home.press('Enter');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[data-signature-stage]')).toBeVisible();
  });
});
