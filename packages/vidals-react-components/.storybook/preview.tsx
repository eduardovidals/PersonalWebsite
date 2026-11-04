import type { Preview } from '@storybook/react-vite';
import './preview.css';

const preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="catalog-surface">
        <Story />
      </div>
    ),
  ],
  parameters: {
    a11y: { test: 'error' },
    layout: 'padded',
    backgrounds: { disable: true },
  },
} satisfies Preview;

export default preview;
