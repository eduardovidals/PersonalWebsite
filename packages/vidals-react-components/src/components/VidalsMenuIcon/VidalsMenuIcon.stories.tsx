import { VidalsIconButton, VidalsMenuIcon } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { VidalsMenuIcon as MenuIconDocs } from './VidalsMenuIcon.js';

const meta = {
  title: 'Foundations/VidalsMenuIcon',
  component: MenuIconDocs,
  args: { isOpen: false },
} satisfies Meta<typeof VidalsMenuIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = { args: { isOpen: true } };

function Toggle() {
  const [open, setOpen] = useState(false);
  return (
    <VidalsIconButton aria-label={open ? 'Close menu' : 'Open menu'} onPress={() => setOpen(!open)}>
      <VidalsMenuIcon isOpen={open} />
    </VidalsIconButton>
  );
}

export const Morphing: Story = {
  render: () => <Toggle />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
    const close = canvas.getByRole('button', { name: 'Close menu' });
    await expect(close.querySelector('svg')).toHaveAttribute('data-open');
  },
};
