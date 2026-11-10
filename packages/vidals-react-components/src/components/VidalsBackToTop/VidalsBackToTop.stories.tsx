import { VidalsBackToTop } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { VidalsBackToTop as BackToTopDocs } from './VidalsBackToTop.js';

const meta = {
  title: 'Controls/VidalsBackToTop',
  component: BackToTopDocs,
  args: { threshold: 0 },
} satisfies Meta<typeof VidalsBackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A zero threshold shows the control immediately so it can be reviewed in the catalog. */
export const Visible: Story = {
  play: async ({ canvasElement }) => {
    const action = await within(canvasElement.ownerDocument.body).findByRole('button', {
      name: 'Back to top',
    });
    // It fades in over 300ms.
    await waitFor(() => expect(action).toBeVisible());
  },
};
