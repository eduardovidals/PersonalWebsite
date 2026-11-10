import { VidalsLanguageMenu } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { VidalsLanguageMenu as LanguageMenuDocs } from './VidalsLanguageMenu.js';

const meta = {
  title: 'Navigation/VidalsLanguageMenu',
  component: LanguageMenuDocs,
  render: (args) => <VidalsLanguageMenu {...args} />,
  args: {
    label: 'Language',
    currentId: 'en',
    onAction: fn(),
    options: [
      { id: 'en', label: 'English', href: '#en' },
      { id: 'es', label: 'Español', href: '#es' },
      { id: 'ar', label: 'العربية', href: '#ar' },
      { id: 'vi', label: 'Tiếng Việt', href: '#vi' },
    ],
  },
} satisfies Meta<typeof VidalsLanguageMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(page.getByRole('button', { name: /^Language/ }));
    const vietnamese = await page.findByRole('menuitem', { name: 'Tiếng Việt' });
    await expect(vietnamese).toHaveAttribute('lang', 'vi');
    await userEvent.keyboard('{Escape}');
  },
};

export const Arabic: Story = {
  args: { currentId: 'ar', label: 'اللغة' },
};
