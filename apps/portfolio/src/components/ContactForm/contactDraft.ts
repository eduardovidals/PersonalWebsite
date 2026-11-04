import { z } from 'zod';

export const contactDraft = z.object({
  from_name: z.string().trim().min(1, 'Enter your name.').max(150),
  reply_to: z.email('Enter a valid email address.').max(254),
  message: z.string().trim().min(1, 'Write a message first.').max(5000),
});
export type ContactDraft = z.infer<typeof contactDraft>;
