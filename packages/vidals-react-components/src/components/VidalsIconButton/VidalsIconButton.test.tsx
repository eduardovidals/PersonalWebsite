import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VidalsIconButton } from './VidalsIconButton.js';

describe('VidalsIconButton', () => {
  it('names an icon-only action, activates from the keyboard, and opts into the press ripple', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <VidalsIconButton aria-label="Open menu" onPress={onPress}>
        <svg aria-hidden="true" />
      </VidalsIconButton>,
    );
    const action = screen.getByRole('button', { name: 'Open menu' });
    await user.tab();
    expect(action).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(action).toHaveAttribute('data-ripple');
  });
});
