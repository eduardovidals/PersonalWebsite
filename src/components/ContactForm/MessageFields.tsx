'use client';

import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import type { DeliverySettings } from './types';

const input =
  'mt-1 block w-full rounded-sm border border-muted bg-paper px-3 py-2 text-base text-ink';
const subscribe = () => () => {};
const hydrated = () => true;
const prerendered = () => false;

/** Keep drafts after network failures and never send twice for one pending submission. */
export function MessageFields(props: { settings: DeliverySettings }) {
  const { settings } = props;
  const [result, setResult] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const pending = useRef(false);
  const interactive = useSyncExternalStore(subscribe, hydrated, prerendered);
  if (!interactive) return null; // No inert form or GET submission before hydration.

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    pending.current = true;
    setResult('sending');
    try {
      const { sendForm } = await import('@emailjs/browser');
      await sendForm(settings.serviceId, settings.templateId, form, {
        publicKey: settings.publicKey,
      });
      form.reset();
      setResult('sent');
    } catch {
      setResult('error');
    } finally {
      pending.current = false;
    }
  }

  return (
    <form onSubmit={submit} method="post" className="mb-7 space-y-4 border-b border-line pb-6">
      <fieldset aria-busy={result === 'sending'} className="space-y-4">
        <legend className="sr-only">Send Eduardo a message</legend>
        <label className="block text-sm font-semibold">
          Your name
          <input
            readOnly={result === 'sending'}
            className={input}
            name="from_name"
            autoComplete="name"
            required
            maxLength={150}
          />
        </label>
        <label className="block text-sm font-semibold">
          Email address
          <input
            className={input}
            name="reply_to"
            readOnly={result === 'sending'}
            autoComplete="email"
            type="email"
            required
            maxLength={254}
          />
        </label>
        <label className="block text-sm font-semibold">
          Message
          <textarea
            readOnly={result === 'sending'}
            className={input}
            name="message"
            rows={4}
            required
            maxLength={5000}
          />
        </label>
        <button
          type="submit"
          disabled={result === 'sending'}
          className="rounded-sm bg-ink px-4 py-2 font-bold text-paper disabled:opacity-70"
        >
          {result === 'sending' ? 'Sending…' : 'Send message →'}
        </button>
      </fieldset>
      <p role="status" aria-live="polite" className="text-sm">
        {result === 'sent'
          ? 'Message sent. Thanks for writing!'
          : result === 'error'
            ? 'Delivery could not be confirmed. Your draft is still here; you can also email directly.'
            : ''}
      </p>
    </form>
  );
}
