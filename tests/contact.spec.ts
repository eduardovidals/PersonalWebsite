import { expect, test } from '@playwright/test';

test('configured contact delivery retains a failed draft and clears only on confirmed success', async ({
  page,
}) => {
  let attempts = 0;
  await page.route('https://api.emailjs.com/**', async (route) => {
    attempts++;
    expect(route.request().postData()).toContain('A website question');
    await route.fulfill({
      status: attempts === 1 ? 503 : 200,
      body: attempts === 1 ? 'Unavailable' : 'OK',
    });
  });
  await page.goto('http://127.0.0.1:4183/#contact');
  await page.getByLabel('Your name').fill('Test reader');
  await page.getByLabel('Email address').fill('reader@example.test');
  const message = page.getByLabel('Message', { exact: true });
  await message.fill('A website question');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Delivery could not be confirmed.', { exact: false })).toBeVisible();
  await expect(message).toHaveValue('A website question');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Message sent. Thanks for writing!')).toBeVisible();
  await expect(message).toHaveValue('');
  expect(attempts).toBe(2);
});
