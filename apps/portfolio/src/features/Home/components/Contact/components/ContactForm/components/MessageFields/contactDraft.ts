import { z } from 'zod';
import type { ContactFormLabels } from './types';

/** The contact form's schema, with validation messages in the page's language. */
export function contactDraft(labels: ContactFormLabels) {
  return z.object({
    from_name: z.string().trim().min(1, labels.nameRequired).max(150),
    reply_to: z.email(labels.emailInvalid).max(254),
    message: z.string().trim().min(1, labels.messageRequired).max(5000),
  });
}

export type ContactDraft = z.infer<ReturnType<typeof contactDraft>>;
