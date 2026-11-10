import { expect, test } from '@playwright/test';

for (const width of [320, 390, 1280]) {
  test(`homepage identifies the section on scroll and anchor navigation at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'On This Page' });
    const active = nav.locator('[aria-current="location"]');
    await expect(nav.getByRole('link')).toHaveText(['Work', 'Career', 'Toolkit', 'Contact']);
    await expect(active).toHaveCount(0);
    await nav.getByRole('link', { name: 'Work', exact: true }).click();
    await expect(active).toHaveText('Work');
    await expect(nav).toBeInViewport({ ratio: 1 });
    await expect(page).toHaveURL(/#projects$/);
    for (const [id, label] of [
      ['about', 'Career'],
      ['skills', 'Toolkit'],
      ['contact', 'Contact'],
      ['about', 'Career'],
    ]) {
      await page.locator('#' + id).evaluate((el) => el.scrollIntoView());
      await expect(active).toHaveText(label);
      await expect(active).toBeInViewport();
      const navBottom = (await nav.boundingBox())!.y + (await nav.boundingBox())!.height;
      const heading = await page
        .locator('#' + id)
        .getByRole('heading')
        .first()
        .boundingBox();
      expect(heading!.y).toBeGreaterThanOrEqual(navBottom - 1);
    }
    await expect(page).toHaveURL(/#projects$/);
    await page.goto('/#contact');
    await expect(active).toHaveText('Contact');
    await expect(page.getByRole('link', { name: 'eduardo.r.vidals@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:eduardo.r.vidals@gmail.com',
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
  });
}

test('site links distinguish the current page from its parent section', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await page.goto('/projects/');
  await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'page');
  await page.goto('/projects/software-factory/');
  await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'location');
  await nav.getByRole('link', { name: 'About' }).click();
  await expect(nav.locator('[aria-current]')).toHaveText('About');
});

test('the logo returns to the top of the landing page from anywhere', async ({ page }) => {
  const logo = page.getByRole('banner').getByRole('link', { name: 'Eduardo Vidals, home' });
  await page.goto('/#contact');
  // Let the deep link finish gliding to Contact, as it would before a reader clicks anything.
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          new Promise<boolean>((settled) => {
            const start = window.scrollY;
            setTimeout(() => settled(start > 0 && window.scrollY === start), 250);
          }),
      ),
    )
    .toBe(true);
  await logo.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/about/');
  await logo.click();
  await expect(page).toHaveURL(/127\.0\.0\.1:4173\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(/Hey, I’m/);
});
