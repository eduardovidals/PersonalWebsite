import { VidalsLinkLabel } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { VidalsLinkLabel as LinkLabelDocs } from './VidalsLinkLabel.js';

const meta = {
  title: 'Foundations/VidalsLinkLabel',
  component: LinkLabelDocs,
  render: (args) => (
    <a
      href="#projects"
      className="inline-flex min-h-11 items-center gap-2 font-medium text-vidals-accent"
    >
      <VidalsLinkLabel {...args} /> <span aria-hidden="true">→</span>
    </a>
  ),
  args: { children: 'All 13 projects' },
} satisfies Meta<typeof VidalsLinkLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InALink: Story = {
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: 'All 13 projects' });
    await expect(link.querySelector('.link-grow')).toHaveTextContent('All 13 projects');
  },
};
