'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { VidalsButton, VidalsTextField } from '@vidals/react-components';
import { useRef, useState, useSyncExternalStore } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { contactDraft, type ContactDraft } from './contactDraft';
import type { DeliverySettings } from './types';

const subscribe = () => () => {};
const hydrated = () => true;
const prerendered = () => false;
const fields = [
  { name: 'from_name', label: 'Your name', autoComplete: 'name', maxLength: 150 },
  { name: 'reply_to', label: 'Email address', autoComplete: 'email', maxLength: 254 },
  { name: 'message', label: 'Message', maxLength: 5000 },
] as const;

/** Keep drafts after failed delivery. EmailJS still receives its original named form fields. */
export function MessageFields(props: { settings: DeliverySettings }) {
  const { settings } = props;
  const [result, setResult] = useState<'idle' | 'sent' | 'error'>('idle');
  const pending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const interactive = useSyncExternalStore(subscribe, hydrated, prerendered);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactDraft>({
    resolver: zodResolver(contactDraft),
    defaultValues: { from_name: '', reply_to: '', message: '' },
  });
  const deliver = async () => {
    if (pending.current || !formRef.current) return;
    const form = formRef.current;
    pending.current = true;
    setResult('idle');
    try {
      const { sendForm } = await import('@emailjs/browser');
      await sendForm(settings.serviceId, settings.templateId, form, {
        publicKey: settings.publicKey,
      });
      reset();
      setResult('sent');
    } catch {
      setResult('error');
    } finally {
      pending.current = false;
    }
  };
  if (!interactive) return null;
  return (
    <form
      ref={formRef}
      onSubmit={(event) => handleSubmit(deliver)(event)}
      method="post"
      noValidate
      className="mb-7 space-y-4 border-b border-vidals-border pb-6"
    >
      <fieldset aria-busy={isSubmitting} className="space-y-4">
        <legend className="sr-only">Send Eduardo a message</legend>
        {fields.map((spec) => (
          <Controller
            key={spec.name}
            name={spec.name}
            control={control}
            render={({ field, fieldState }) => (
              <VidalsTextField
                {...spec}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                controlRef={field.ref}
                isRequired
                isReadOnly={isSubmitting}
                validationBehavior="aria"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                {...(spec.name === 'message'
                  ? { multiline: true, rows: 4 }
                  : { type: spec.name === 'reply_to' ? 'email' : 'text' })}
              />
            )}
          />
        ))}
        <VidalsButton type="submit" isDisabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message →'}
        </VidalsButton>
      </fieldset>
      <p role="status" className="text-sm">
        {result === 'sent'
          ? 'Message sent. Thanks for writing!'
          : result === 'error'
            ? 'Delivery could not be confirmed. Your draft is still here; you can also email directly.'
            : ''}
      </p>
    </form>
  );
}
