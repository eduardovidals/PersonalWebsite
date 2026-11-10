'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { VidalsButton, VidalsTextField } from '@vidals/react-components';
import { useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Form } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { Arrow } from '@/components/Arrow';
import { contactDraft, type ContactDraft } from './contactDraft';
import type { MessageFieldsProps as Props } from './types';

const subscribe = () => () => {};
const hydrated = () => true;
const prerendered = () => false;
/**
 * The message form. Drafts survive a failed delivery, and EmailJS still receives its original
 * named form fields.
 * @example
 * ```tsx
 * <MessageFields settings={settings} labels={messages.home.contact.form} />
 * ```
 */
export function MessageFields(props: Props) {
  const { settings, labels } = props;
  const fields = [
    { name: 'from_name', label: labels.name, autoComplete: 'name', maxLength: 150 },
    { name: 'reply_to', label: labels.email, autoComplete: 'email', maxLength: 254 },
    { name: 'message', label: labels.message, maxLength: 5000 },
  ] as const;
  const schema = useMemo(() => contactDraft(labels), [labels]);
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
    resolver: zodResolver(schema),
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
    <Form
      ref={formRef}
      onSubmit={(event) => handleSubmit(deliver)(event)}
      method="post"
      validationBehavior="aria"
      className="mb-6 space-y-4"
    >
      <fieldset aria-busy={isSubmitting} className="space-y-4">
        <legend className="sr-only">{labels.legend}</legend>
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
          {isSubmitting ? (
            labels.sending
          ) : (
            <>
              {labels.send} <Arrow />
            </>
          )}
        </VidalsButton>
      </fieldset>
      <p role="status" className="text-sm">
        {result === 'sent' ? labels.sent : result === 'error' ? labels.failed : ''}
      </p>
    </Form>
  );
}
