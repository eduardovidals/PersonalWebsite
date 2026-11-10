import 'server-only';
import type { DeliverySettings } from './types';

/** Netlify previews are public to reviewers but should not be indexed. */
export const isDeployPreview = Boolean(process.env.CONTEXT && process.env.CONTEXT !== 'production');

/** Explicit public allowlist for the pre-existing EmailJS form. Never forward the environment. */
export function publicMailSettings(): DeliverySettings | null {
  const serviceId = process.env.REACT_APP_SERVICE_ID?.trim();
  const templateId = process.env.REACT_APP_TEMPLATE_ID?.trim();
  const publicKey = process.env.REACT_APP_PUBLIC_KEY?.trim();
  return serviceId && templateId && publicKey ? { serviceId, templateId, publicKey } : null;
}
