import { expect, test } from '@playwright/test';
import redirectToLanguage, { config } from '../netlify/edge-functions/language';
import vi from '../src/i18n/messages/vi';

interface Visit {
  country?: string;
  system?: string;
  cookie?: string;
  method?: string;
  query?: string;
}

/** Where the homepage edge function sends a visitor, or "English" when it lets the page load. */
function landing(visit: Visit) {
  const headers = new Headers();
  if (visit.system) headers.set('accept-language', visit.system);
  if (visit.cookie) headers.set('cookie', visit.cookie);
  const request = new Request(`https://eduardovidals.com/${visit.query ?? ''}`, {
    method: visit.method ?? 'GET',
    headers,
  });
  const response = redirectToLanguage(request, { geo: { country: { code: visit.country } } });
  return response?.headers.get('location') ?? 'English';
}

test.describe('homepage language', () => {
  test('only the bare homepage redirects, so shared links keep their language', () => {
    expect(config.path).toBe('/');
  });

  test('visitors in a translated country get its language', () => {
    expect(landing({ country: 'VN', system: 'en-US,en;q=0.9' })).toBe('/vi/');
    expect(landing({ country: 'MX', system: 'en-US' })).toBe('/es/');
    expect(landing({ country: 'SA' })).toBe('/ar/');
    expect(landing({ country: 'US', system: 'en-US,en;q=0.9' })).toBe('English');
    expect(landing({})).toBe('English');
  });

  test('a translated system language wins anywhere', () => {
    expect(landing({ country: 'US', system: 'vi-VN,vi;q=0.9,en;q=0.8' })).toBe('/vi/');
    expect(landing({ country: 'US', system: 'es-419,es;q=0.9' })).toBe('/es/');
    expect(landing({ country: 'VN', system: 'es-ES' })).toBe('/es/');
    expect(landing({ country: 'FR', system: 'fr-FR,ar;q=0.6,en;q=0.4' })).toBe('/ar/');
    expect(landing({ country: 'US', system: 'en-US,vi;q=0.8' })).toBe('English');
    expect(landing({ country: 'US', system: 'vi;q=0,en' })).toBe('English');
  });

  test('a language chosen in the menu wins over system language and country', () => {
    expect(landing({ country: 'VN', system: 'vi-VN', cookie: 'theme=dark; language=en' })).toBe(
      'English',
    );
    expect(landing({ country: 'US', system: 'en-US', cookie: 'language=ar' })).toBe('/ar/');
    expect(landing({ country: 'VN', cookie: 'language=xx' })).toBe('/vi/');
  });

  test('keeps campaign parameters and leaves other requests alone', () => {
    expect(landing({ country: 'VN', query: '?ref=card' })).toBe('/vi/?ref=card');
    expect(landing({ country: 'VN', method: 'POST' })).toBe('English');
  });
});

test('choosing a language in the menu keeps it for the next homepage visit', async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/vi/');
  await page.getByRole('button', { name: vi.common.language }).click();
  await page.getByRole('menuitem', { name: 'English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  const choice = (await context.cookies()).find((cookie) => cookie.name === 'language');
  expect(choice?.value).toBe('en');
  expect(choice?.sameSite).toBe('Lax');
  // A Vietnamese reader in Vietnam who picked English is not sent back to Vietnamese.
  expect(landing({ country: 'VN', system: 'vi-VN', cookie: `language=${choice?.value}` })).toBe(
    'English',
  );
});

test.describe('a Vietnamese system', () => {
  test.use({ locale: 'vi-VN' });

  test('opens the homepage in Vietnamese even when the browser lists only English', async ({
    page,
  }) => {
    // Chrome keeps its language list from install time, while Intl follows the system language.
    await page.addInitScript(() =>
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] }),
    );
    await page.goto('/?ref=card');
    await expect(page).toHaveURL(/\/vi\/\?ref=card$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  });

  test('keeps a language chosen in the menu', async ({ page, context }) => {
    await context.addCookies([{ name: 'language', value: 'en', url: 'http://127.0.0.1:4173' }]);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/:4173\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('leaves shared links to other pages in their language', async ({ page }) => {
    await page.goto('/about/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/:4173\/about\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
