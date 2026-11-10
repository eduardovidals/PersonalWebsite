import { VidalsButton, VidalsPressRipple } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { VidalsPressRipple as PressRippleDocs } from './VidalsPressRipple.js';

const meta = {
  title: 'Foundations/VidalsPressRipple',
  component: PressRippleDocs,
  render: () => (
    <>
      <VidalsPressRipple />
      <VidalsButton data-ripple="" className="relative overflow-hidden">
        Press me
      </VidalsButton>
    </>
  ),
} satisfies Meta<typeof VidalsPressRipple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnPress: Story = {
  play: async ({ canvasElement }) => {
    const action = within(canvasElement).getByRole('button', { name: 'Press me' });
    await userEvent.pointer({ keys: '[MouseLeft>]', target: action });
    await expect(action.querySelector('.press-ripple')).not.toBeNull();
    await userEvent.pointer({ keys: '[/MouseLeft]', target: action });
  },
};
