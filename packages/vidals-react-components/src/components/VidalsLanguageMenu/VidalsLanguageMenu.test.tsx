import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-aria-components';
import { describe, expect, it, vi } from 'vitest';
import { VidalsLanguageMenu } from './VidalsLanguageMenu.js';

const options = [
  { id: 'en', label: 'English', href: '/about/' },
  { id: 'es', label: 'Español', href: '/es/about/' },
  { id: 'ar', label: 'العربية', href: '/ar/about/' },
];

describe('VidalsLanguageMenu', () => {
  it('lists each language in its own language and navigates through the app router', async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    render(
      <RouterProvider navigate={navigate}>
        <VidalsLanguageMenu options={options} currentId="en" label="Language" />
      </RouterProvider>,
    );
    await user.click(screen.getByRole('button', { name: /^Language/ }));
    const menu = await screen.findByRole('menu', { name: /^Language/ });
    const arabic = screen.getByRole('menuitem', { name: 'العربية' });
    expect(menu).toContainElement(arabic);
    expect(arabic).toHaveAttribute('lang', 'ar');
    expect(arabic).toHaveAttribute('href', '/ar/about/');
    await user.click(screen.getByRole('menuitem', { name: 'Español' }));
    expect(navigate).toHaveBeenCalledWith('/es/about/', undefined);
  });

  it('reports the chosen language before the page changes', async () => {
    const user = userEvent.setup();
    const calls: string[] = [];
    render(
      <RouterProvider navigate={(href) => calls.push(`navigate ${href}`)}>
        <VidalsLanguageMenu
          options={options}
          currentId="en"
          label="Language"
          onAction={(id) => calls.push(`chose ${id}`)}
        />
      </RouterProvider>,
    );
    await user.click(screen.getByRole('button', { name: /^Language/ }));
    await user.click(await screen.findByRole('menuitem', { name: 'العربية' }));
    expect(calls).toEqual(['chose ar', 'navigate /ar/about/']);
  });
});
