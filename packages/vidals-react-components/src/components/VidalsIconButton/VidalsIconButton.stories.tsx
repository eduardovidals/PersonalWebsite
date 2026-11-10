import { VidalsIconButton } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { VidalsIconButton as IconButtonDocs } from './VidalsIconButton.js';

const icon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="size-5"
  >
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

const meta = {
  title: 'Controls/VidalsIconButton',
  component: IconButtonDocs,
  render: (args) => <VidalsIconButton {...args} />,
  args: { 'aria-label': 'Back to top', children: icon, onPress: fn() },
} satisfies Meta<typeof VidalsIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const action = within(canvasElement).getByRole('button', { name: 'Back to top' });
    action.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onPress).toHaveBeenCalledTimes(1);
    await expect(action).toHaveAttribute('data-ripple');
  },
};
