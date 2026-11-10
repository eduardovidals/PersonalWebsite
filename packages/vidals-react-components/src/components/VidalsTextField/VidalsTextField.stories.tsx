import { VidalsTextField, type VidalsTextFieldProps } from '@vidals/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { VidalsTextField as FieldDocs } from './VidalsTextField.js';

const meta = {
  title: 'Controls/VidalsTextField',
  component: FieldDocs,
  render: (args) => <VidalsTextField {...args} />,
  args: { label: 'Email address' },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VidalsTextField>;

export default meta;
type InputStory = StoryObj<Extract<VidalsTextFieldProps, { multiline?: false }>>;
type TextAreaStory = StoryObj<Extract<VidalsTextFieldProps, { multiline: true }>>;

export const Email: InputStory = {
  args: {
    label: 'Email address',
    name: 'reply_to',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    description: 'Where should I send my reply?',
  },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole('textbox', { name: 'Email address' });
    await userEvent.type(control, 'ada@example.com');
    await expect(control).toHaveValue('ada@example.com');
    await expect(control).toHaveAccessibleDescription('Where should I send my reply?');
  },
};
export const Multiline: TextAreaStory = {
  args: { label: 'Message', name: 'message', multiline: true, rows: 4 },
};
export const Invalid: InputStory = {
  args: {
    label: 'Email address',
    type: 'email',
    defaultValue: 'ada',
    isInvalid: true,
    errorMessage: 'Enter a complete email address.',
  },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole('textbox', { name: 'Email address' });
    await expect(control).toBeInvalid();
    await expect(control).toHaveAccessibleDescription('Enter a complete email address.');
  },
};
export const ReadOnly: TextAreaStory = {
  args: {
    label: 'Message',
    name: 'message',
    multiline: true,
    defaultValue: 'Please get in touch.',
    isReadOnly: true,
  },
  render: (args) => (
    <form aria-label="Preview">
      <VidalsTextField {...args} />
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('textbox', { name: 'Message' });
    await expect(control).toHaveAttribute('readonly');
    const form = canvas.getByRole<HTMLFormElement>('form', { name: 'Preview' });
    await expect(new FormData(form).get('message')).toBe('Please get in touch.');
  },
};
