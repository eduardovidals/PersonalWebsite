import { expect, test } from '@playwright/test';
import ar from '../src/i18n/messages/ar';
import en from '../src/i18n/messages/en';
import es from '../src/i18n/messages/es';
import vi from '../src/i18n/messages/vi';

const languages = [
  { id: 'en', prefix: '', dir: 'ltr', messages: en },
  { id: 'es', prefix: '/es', dir: 'ltr', messages: es },
  { id: 'ar', prefix: '/ar', dir: 'rtl', messages: ar },
  { id: 'vi', prefix: '/vi', dir: 'ltr', messages: vi },
] as const;

const pages = ['/', '/about/', '/projects/', '/projects/software-factory/', '/projects/props/'];

for (const language of languages) {
  test(`${language.id}: every page renders in its language and lists its translations`, async ({
    request,
  }) => {
    for (const path of pages) {
      const url = language.prefix + path;
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
      const html = await response.text();
      expect(html, url).toContain(`<html lang="${language.id}" dir="${language.dir}"`);
      for (const [hreflang, prefix] of [
        ['en', ''],
        ['es', '/es'],
        ['ar', '/ar'],
        ['vi', '/vi'],
        ['x-default', ''],
      ]) {
        expect(html, `${url} → ${hreflang}`).toContain(
          `hrefLang="${hreflang}" href="https://www.eduardovidals.com${prefix}${path}"`,
        );
      }
    }
  });

  test(`${language.id}: the homepage reads in its language and links stay in it`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(language.prefix + '/');
    const copy = language.messages;
    await expect(page.getByRole('heading', { level: 1 })).toContainText(copy.home.intro.greeting);
    await expect(page.getByText(copy.home.intro.headline)).toBeVisible();
    const primary = page.getByRole('navigation', { name: copy.common.nav.label });
    await expect(primary.getByRole('link', { name: copy.common.nav.about })).toHaveAttribute(
      'href',
      language.prefix + '/about/',
    );
    await primary.getByRole('link', { name: copy.common.nav.work }).click();
    await expect(page).toHaveURL(new RegExp(`${language.prefix}/projects/$`));
    await expect(page.locator('html')).toHaveAttribute('lang', language.id);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(copy.projects.page.title);
  });
}

test('the language menu opens the same page in another language', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/about/');
  await page.getByRole('button', { name: en.common.language }).click();
  await page.getByRole('menuitem', { name: 'Español' }).click();
  await expect(page).toHaveURL(/\/es\/about\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(es.about.title);

  const menu = page.getByRole('button', { name: es.common.language });
  await menu.focus();
  await page.keyboard.press('Enter');
  const arabic = page.getByRole('menuitem', { name: 'العربية' });
  await expect(arabic).toHaveAttribute('lang', 'ar');
  await arabic.click();
  await expect(page).toHaveURL(/\/ar\/about\/$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('Arabic pages mirror the layout', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/ar/');
  const home = page.getByRole('link', { name: ar.common.homeLink });
  const box = await home.boundingBox();
  expect(box && box.x > 640, 'the home link starts on the right').toBe(true);
  const tabs = page.getByRole('navigation', { name: ar.home.sectionNav.label }).getByRole('link');
  const first = await tabs.first().boundingBox();
  const last = await tabs.last().boundingBox();
  expect(first && last && first.x > last.x, 'tabs run right to left').toBe(true);
});

test('Vietnamese pages give React Aria Vietnamese strings', async ({ page }) => {
  await page.goto('/vi/');
  const locale = await page.evaluate(() =>
    Reflect.get(window, Symbol.for('react-aria.i18n.locale')),
  );
  expect(locale).toBe('vi');
});
