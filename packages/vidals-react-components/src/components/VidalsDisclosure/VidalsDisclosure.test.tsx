import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { VidalsDisclosure } from './VidalsDisclosure.js';

describe('VidalsDisclosure', () => {
  it('toggles its panel from the keyboard and lets the trigger reflect the state', async () => {
    const user = userEvent.setup();
    render(
      <VidalsDisclosure trigger={({ isExpanded }) => (isExpanded ? 'Fewer tools' : 'More tools')}>
        <p>Docker</p>
      </VidalsDisclosure>,
    );
    const trigger = screen.getByRole('button', { name: 'More tools' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Docker')).not.toBeVisible();
    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'Fewer tools' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText('Docker')).toBeVisible();
  });
});
