import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider } from 'react-aria-components';
import { describe, expect, it, vi } from 'vitest';
import { VidalsLink } from './VidalsLink.js';

describe('VidalsLink', () => {
  it('renders a real link, marks the current page, and opts calls to action into the ripple', () => {
    render(
      <>
        <VidalsLink href="/about/" aria-current="page">
          About
        </VidalsLink>
        <VidalsLink href="/projects/" variant="primary">
          All projects
        </VidalsLink>
      </>,
    );
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toHaveAttribute('href', '/about/');
    expect(about).toHaveAttribute('aria-current', 'page');
    expect(about).toHaveAttribute('data-current');
    expect(about).not.toHaveAttribute('data-ripple');
    expect(screen.getByRole('link', { name: 'All projects' })).toHaveAttribute('data-ripple');
  });

  it('hands same-site paths to the app router and reports the press', async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    const onPress = vi.fn();
    render(
      <RouterProvider navigate={navigate}>
        <VidalsLink href="/projects/" onPress={onPress}>
          Projects
        </VidalsLink>
      </RouterProvider>,
    );
    await user.tab();
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/projects/', undefined);
  });
});
