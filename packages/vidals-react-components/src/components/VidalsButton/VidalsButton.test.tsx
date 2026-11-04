import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VidalsButton } from './VidalsButton.js';

describe('VidalsButton', () => {
  it('activates a named action with the keyboard and preserves render props', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <VidalsButton
        variant="subtle"
        aria-label="Open navigation"
        className={({ isFocusVisible }) => (isFocusVisible ? 'keyboard-target' : 'resting')}
        onPress={onPress}
      >
        {({ isPressed }) => (isPressed ? 'Pressed' : 'Menu')}
      </VidalsButton>,
    );
    const action = screen.getByRole('button', { name: 'Open navigation' });
    await user.tab();
    expect(action).toHaveFocus();
    expect(action).toHaveClass('keyboard-target');
    await user.keyboard('{Enter}');
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('suppresses disabled and pending actions while keeping the pending action focusable', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <>
        <VidalsButton onPress={onPress} isDisabled>
          Disabled
        </VidalsButton>
        <VidalsButton onPress={onPress} isPending>
          Sending
        </VidalsButton>
      </>,
    );
    const disabled = screen.getByRole('button', { name: 'Disabled' });
    const pending = screen.getByRole('button', { name: 'Sending' });
    expect(disabled).toBeDisabled();
    expect(pending).toHaveAttribute('data-pending');
    await user.tab();
    expect(pending).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.click(disabled);
    await user.click(pending);
    expect(onPress).not.toHaveBeenCalled();
  });
});
