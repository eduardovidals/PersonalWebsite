import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-aria-components';
import { describe, expect, it, vi } from 'vitest';
import { VidalsMobileMenu } from './VidalsMobileMenu.js';

const items = [
  { label: 'Work', href: '/projects/', current: 'page' },
  { label: 'About', href: '/about/' },
] as const;

describe('VidalsMobileMenu', () => {
  it('opens a named dialog of links, marks the current page, and closes with Escape', async () => {
    const user = userEvent.setup();
    render(
      <VidalsMobileMenu
        items={items}
        secondaryItems={[{ label: 'GitHub', href: 'https://github.com/' }]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Site navigation' });
    const work = screen.getByRole('link', { name: 'Work' });
    expect(dialog).toContainElement(work);
    expect(work).toHaveAttribute('href', '/projects/');
    expect(work).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    // React Aria hides content outside the open modal from assistive tech; the visible X still closes it.
    expect(screen.getByRole('button', { name: 'Close menu', hidden: true })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    // Focus returns to the trigger on the next frame.
    await waitFor(() => expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus());
  });

  it('closes after a link is pressed', async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    render(
      <RouterProvider navigate={navigate}>
        <VidalsMobileMenu items={items} />
      </RouterProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(await screen.findByRole('link', { name: 'About' }));
    expect(navigate).toHaveBeenCalledWith('/about/', undefined);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
