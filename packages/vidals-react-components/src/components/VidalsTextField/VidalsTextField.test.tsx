import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VidalsTextField } from './VidalsTextField.js';

describe('VidalsTextField', () => {
  it('owns a labeled input with native constraints and accessible help', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <VidalsTextField
        label="Reply address"
        name="reply_to"
        autoComplete="email"
        type="email"
        isRequired
        maxLength={254}
        description="Used only to reply."
        onChange={onChange}
      />,
    );
    const email = screen.getByRole('textbox', { name: 'Reply address' });
    expect(email).toHaveAttribute('name', 'reply_to');
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('autocomplete', 'email');
    expect(email).toHaveAttribute('maxlength', '254');
    expect(email).toBeRequired();
    expect(email).toHaveAccessibleDescription('Used only to reply.');
    await user.tab();
    expect(email).toHaveAttribute('data-focus-visible');
    await user.type(email, 'a');
    expect(onChange).toHaveBeenLastCalledWith('a');
  });

  it('associates invalid feedback with the control', () => {
    const controlRef = vi.fn();
    render(
      <VidalsTextField
        label="Your name"
        controlRef={controlRef}
        isInvalid
        errorMessage="Please enter a name."
      />,
    );
    const input = screen.getByLabelText('Your name');
    expect(controlRef).toHaveBeenCalledWith(input);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Please enter a name.');
  });

  it('locks both controls during delivery without losing their successful form values', async () => {
    const user = userEvent.setup();
    render(
      <form aria-label="Message">
        <VidalsTextField label="Name" name="from_name" defaultValue="Ada" isReadOnly />
        <VidalsTextField
          label="Message"
          name="message"
          multiline
          rows={6}
          maxLength={5000}
          defaultValue={'A note\nwith lines.'}
          isReadOnly
        />
        <VidalsTextField label="Inactive" name="inactive" defaultValue="omit me" isDisabled />
      </form>,
    );
    const name = screen.getByRole('textbox', { name: 'Name' });
    const message = screen.getByRole('textbox', { name: 'Message' });
    expect(name).toHaveAttribute('readonly');
    expect(message).toHaveAttribute('readonly');
    expect(message.tagName).toBe('TEXTAREA');
    expect(message).toHaveAttribute('rows', '6');
    expect(message).toHaveAttribute('maxlength', '5000');
    await user.type(message, 'edit');
    const form = screen.getByRole<HTMLFormElement>('form', { name: 'Message' });
    expect(Object.fromEntries(new FormData(form))).toEqual({
      from_name: 'Ada',
      message: 'A note\nwith lines.',
    });
  });
});
