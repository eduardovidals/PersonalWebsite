import { VidalsDisclosure } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { VidalsDisclosure as DisclosureDocs } from './VidalsDisclosure.js';

const meta = {
  title: 'Controls/VidalsDisclosure',
  component: DisclosureDocs,
  render: (args) => <VidalsDisclosure {...args} />,
  args: {
    trigger: 'Early projects (6)',
    children: (
      <p className="pt-3 text-vidals-muted">Pathfinding Visualizer, Props, and Solar System</p>
    ),
  },
} satisfies Meta<typeof VidalsDisclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  play: async ({ canvasElement }) => {
    const page = within(canvasElement);
    const trigger = page.getByRole('button', { name: 'Early projects (6)' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(page.getByText(/Pathfinding Visualizer/)).toBeVisible());
  },
};

export const Expanded: Story = {
  args: { defaultExpanded: true },
};

export const SwitchingLabel: Story = {
  args: {
    trigger: ({ isExpanded }) => (isExpanded ? 'Fewer tools' : 'More tools'),
    children: <p className="pt-3 text-vidals-muted">Docker, Nx, and Vitest</p>,
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement);
    await userEvent.click(page.getByRole('button', { name: 'More tools' }));
    await expect(page.getByRole('button', { name: 'Fewer tools' })).toBeInTheDocument();
  },
};
