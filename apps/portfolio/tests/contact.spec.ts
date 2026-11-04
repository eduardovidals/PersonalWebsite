import { expect, test } from '@playwright/test';

const contact = 'http://127.0.0.1:4183/#contact';

test('keyboard submission reports invalid fields without requesting delivery', async ({ page }) => {
  let attempts = 0;
  await page.route('https://api.emailjs.com/**', async (route) => {
    attempts++;
    await route.abort();
  });
  await page.goto(contact);
  const name = page.getByLabel('Your name');
  const email = page.getByLabel('Email address');
  const message = page.getByLabel('Message', { exact: true });
  await name.fill('Test reader');
  await name.press('Tab');
  await expect(email).toBeFocused();
  await email.fill('not-an-email');
  await email.press('Tab');
  await expect(message).toBeFocused();
  await message.press('Tab');
  await expect(page.getByRole('button', { name: /Send message/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Enter a valid email address.', { exact: true })).toBeVisible();
  await expect(page.getByText('Write a message first.', { exact: true })).toBeVisible();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await expect(message).toHaveAttribute('aria-invalid', 'true');
  await expect(email).toBeFocused();
  await expect(name).toHaveValue('Test reader');
  expect(attempts).toBe(0);
});

test('configured contact delivery keeps a pending or failed draft and clears it on confirmed success', async ({
  page,
}) => {
  let attempts = 0;
  const { promise: pending, resolve: releaseFailure } = Promise.withResolvers<void>();
  await page.route('https://api.emailjs.com/**', async (route) => {
    attempts++;
    expect(route.request().postData()).toContain('A website question');
    if (attempts === 1) await pending;
    await route.fulfill({
      status: attempts === 1 ? 503 : 200,
      body: attempts === 1 ? 'Unavailable' : 'OK',
    });
  });
  await page.goto(contact);
  const name = page.getByLabel('Your name');
  const email = page.getByLabel('Email address');
  const message = page.getByLabel('Message', { exact: true });
  await name.fill('Test reader');
  await email.fill('reader@example.test');
  await message.fill('A website question');
  await page.getByRole('button', { name: 'Send message' }).click();
  try {
    await expect(page.getByRole('button', { name: /Sending/ })).toBeDisabled();
    await expect.poll(() => attempts).toBe(1);
    await expect(name).not.toBeEditable();
    await expect(email).not.toBeEditable();
    await expect(message).not.toBeEditable();
    await expect(message).toHaveValue('A website question');
    await email.press('Enter');
  } finally {
    releaseFailure();
  }
  await expect(page.getByText('Delivery could not be confirmed.', { exact: false })).toBeVisible();
  expect(attempts).toBe(1);
  await expect(name).toHaveValue('Test reader');
  await expect(email).toHaveValue('reader@example.test');
  await expect(message).toHaveValue('A website question');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Message sent. Thanks for writing!')).toBeVisible();
  await expect(name).toHaveValue('');
  await expect(email).toHaveValue('');
  await expect(message).toHaveValue('');
  expect(attempts).toBe(2);
});
