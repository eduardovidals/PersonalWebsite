import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { VidalsBackToTop } from './VidalsBackToTop.js';

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('VidalsBackToTop', () => {
  afterEach(() => scrollTo(0));

  it('stays out of the tab order at the top and returns readers to the start once shown', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((step) => {
      step(0);
      return 0;
    });
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <>
        <main id="main" tabIndex={-1}>
          Start
        </main>
        <VidalsBackToTop focusTargetId="main" />
      </>,
    );
    const action = screen.getByRole('button', { name: 'Back to top', hidden: true });
    const layer = action.parentElement!;
    expect(layer).toHaveAttribute('aria-hidden', 'true');
    expect(layer).toHaveAttribute('inert');
    expect(action).toHaveAttribute('tabindex', '-1');
    scrollTo(window.innerHeight * 2);
    expect(layer).not.toHaveAttribute('aria-hidden');
    expect(layer).not.toHaveAttribute('inert');
    expect(layer).toHaveAttribute('data-visible');
    await user.click(action);
    expect(scroll).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
    expect(document.getElementById('main')).toHaveFocus();
  });
});
