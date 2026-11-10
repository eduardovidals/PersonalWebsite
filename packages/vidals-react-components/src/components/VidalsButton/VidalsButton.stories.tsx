import { VidalsButton } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { VidalsButton as ButtonDocs } from './VidalsButton.js';

const meta = {
  title: 'Controls/VidalsButton',
  component: ButtonDocs,
  render: (args) => <VidalsButton {...args} />,
  args: { children: 'Send message', onPress: fn() },
  argTypes: { variant: { control: 'select', options: ['primary', 'subtle'] } },
} satisfies Meta<typeof VidalsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement, args }) => {
    const action = within(canvasElement).getByRole('button', { name: 'Send message' });
    action.focus();
    await userEvent.keyboard('{Enter}');
    await expect(action).toHaveFocus();
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const Subtle: Story = { args: { variant: 'subtle', children: 'Close details' } };
export const Disabled: Story = { args: { isDisabled: true } };
export const Pending: Story = {
  args: { isPending: true, children: 'Sending…', onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const action = within(canvasElement).getByRole('button', { name: 'Sending…' });
    await userEvent.click(action);
    await expect(action).toHaveAttribute('data-pending');
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};
