import { expect, test } from '@playwright/test';

for (const width of [320, 390, 1280]) {
  test(`homepage identifies the section on scroll and anchor navigation at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'On this page' });
    const active = nav.locator('[aria-current="location"]');
    await expect(nav.getByRole('link')).toHaveText([
      'Work',
      'Career',
      'Toolkit',
      'Blog',
      'Contact',
    ]);
    await expect(active).toHaveCount(0);
    await nav.getByRole('link', { name: 'Work', exact: true }).click();
    await expect(active).toHaveText('Work');
    await expect(nav).toBeInViewport({ ratio: 1 });
    await expect(page).toHaveURL(/#projects$/);
    for (const [id, label] of [
      ['about', 'Career'],
      ['skills', 'Toolkit'],
      ['blog', 'Blog'],
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
  await nav.getByRole('link', { name: 'Blog' }).click();
  await expect(nav.locator('[aria-current]')).toHaveText('Blog');
});
