import { VidalsLink } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { VidalsLink as LinkDocs } from './VidalsLink.js';

const meta = {
  title: 'Navigation/VidalsLink',
  component: LinkDocs,
  render: (args) => <VidalsLink {...args} />,
  args: { href: '#projects', children: 'All projects', variant: 'inline' },
} satisfies Meta<typeof VidalsLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: 'All projects' });
    await expect(link).toHaveAttribute('href', '#projects');
  },
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'My work' },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: 'My work' });
    await expect(link).toHaveAttribute('data-ripple');
  },
};

export const Secondary: Story = {
  args: { variant: 'secondary', href: 'mailto:hello@example.com', children: 'Email me' },
};

export const CurrentPage: Story = {
  args: {
    variant: 'plain',
    'aria-current': 'page',
    children: 'About',
    className: 'current:font-bold current:text-vidals-accent',
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: 'About' });
    await expect(link).toHaveAttribute('aria-current', 'page');
  },
};
