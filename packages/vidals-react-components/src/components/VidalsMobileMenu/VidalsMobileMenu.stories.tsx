import { VidalsMobileMenu } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { VidalsMobileMenu as MobileMenuDocs } from './VidalsMobileMenu.js';

const meta = {
  title: 'Navigation/VidalsMobileMenu',
  component: MobileMenuDocs,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    topOffset: '0px',
    items: [
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
    secondaryItems: [
      { label: 'GitHub', href: 'https://github.com/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    ],
  },
} satisfies Meta<typeof VidalsMobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenAndClose: Story = {
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(page.getByRole('button', { name: 'Open menu' }));
    const dialog = await page.findByRole('dialog', { name: 'Site navigation' });
    await waitFor(() => expect(dialog).toBeVisible());
    await userEvent.keyboard('{Escape}');
    // Focus returns once the closing animation ends.
    await waitFor(() => expect(page.getByRole('button', { name: 'Open menu' })).toHaveFocus());
  },
};
