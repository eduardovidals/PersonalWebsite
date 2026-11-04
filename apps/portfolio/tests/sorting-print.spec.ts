import { expect, test } from '@playwright/test';

test('each press swaps one inverted adjacent pair, finishes sorted, and can replay', async ({
  page,
}) => {
  await page.goto('/');
  const print = page.getByRole('figure', { name: 'Playable sorting print' });
  const art = print.getByRole('img', { name: 'Isometric sorting print' });
  const controls = print.getByRole('button');
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
    await expect(print.getByRole('status')).toContainText(
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
  await expect(controls).toHaveAccessibleName('Reset print');
  await controls.press('Enter');
  await expect(print.getByRole('status')).toContainText('Ready.');
  expect(await heights()).toEqual(initial);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('the original print and real case study are present, without a dead swap control', async ({
    page,
  }) => {
    await page.goto('/');
    const print = page.getByRole('figure', { name: 'Playable sorting print' });
    const art = print.getByRole('img', { name: 'Isometric sorting print' });
    await expect(art).toBeVisible();
    await expect(art.locator('[data-height]')).toHaveCount(7);
    await expect(print.getByRole('button')).toHaveCount(0);
    const link = print.getByRole('link', { name: 'Sorting, in three dimensions' });
    await expect(link).toHaveAttribute('href', '/projects/3d-sorting-visualizer/');
    await link.click();
    await expect(page).toHaveURL(/\/projects\/3d-sorting-visualizer\/$/);
  });
});
