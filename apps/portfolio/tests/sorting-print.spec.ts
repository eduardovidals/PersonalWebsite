import { expect, test } from '@playwright/test';

test('each press swaps one inverted adjacent pair, finishes sorted, and can replay', async ({
  page,
}) => {
  await page.goto('/');
  const playground = page.getByRole('figure', { name: 'Sorting playground' });
  const art = playground.getByRole('img', { name: 'Floating sorting sculpture' });
  const controls = playground.getByRole('button');
  const blocks = art.locator('[data-height]');
  const heights = () =>
    blocks.evaluateAll((columns) =>
      columns.map((column) => Number(column.getAttribute('data-height'))),
    );
  const initial = [3, 6, 2, 7, 4, 1, 5];
  const inversions = initial.reduce(
    (n, v, i) => n + initial.slice(i + 1).filter((x) => x < v).length,
    0,
  );
  let previous = initial;
  await expect(controls).toHaveAccessibleName('Next swap');
  expect(await heights()).toEqual(initial);
  for (let move = 1; move <= inversions; move++) {
    await controls.press(move % 2 ? 'Enter' : 'Space');
    await expect(playground.getByRole('status')).toContainText(
      move === inversions ? 'Sorted.' : `Swap ${move} of`,
    );
    await expect(controls).toBeFocused();
    const next = await heights();
    const changed = next.map((v, i) => (v !== previous[i] ? i : -1)).filter((i) => i !== -1);
    expect(changed).toHaveLength(2);
    const [left, right] = changed;
    expect(right).toBe(left + 1);
    expect(previous[left]).toBeGreaterThan(previous[right]);
    expect([next[left], next[right]]).toEqual([previous[right], previous[left]]);
    previous = next;
  }
  expect(previous).toEqual([1, 2, 3, 4, 5, 6, 7]);
  await expect(controls).toHaveAccessibleName('Replay sort');
  await controls.press('Enter');
  await expect(playground.getByRole('status')).toContainText('Ready.');
  expect(await heights()).toEqual(initial);
});

test('the playground waits for input and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/');
  const playground = page.getByRole('figure', { name: 'Sorting playground' });
  const next = playground.getByRole('button', { name: 'Next swap' });
  await expect(next).toBeVisible();
  await page.clock.fastForward(15_000);
  await expect(playground.getByRole('status')).toContainText(
    'Ready. Stack order: 3, 6, 2, 7, 4, 1, 5.',
  );
  await expect(playground.locator('[data-height]').first()).toHaveCSS(
    'transition-property',
    'none',
  );
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('the sculpture and real case study are present, without a dead swap control', async ({
    page,
  }) => {
    await page.goto('/');
    const playground = page.getByRole('figure', { name: 'Sorting playground' });
    const art = playground.getByRole('img', { name: 'Floating sorting sculpture' });
    await expect(art).toBeVisible();
    await expect(art.locator('[data-height]')).toHaveCount(7);
    await expect(playground.getByRole('button')).toHaveCount(0);
    const link = playground.getByRole('link', { name: 'View case study' });
    await expect(link).toHaveAttribute('href', '/projects/3d-sorting-visualizer/');
    await link.click();
    await expect(page).toHaveURL(/\/projects\/3d-sorting-visualizer\/$/);
  });
});
