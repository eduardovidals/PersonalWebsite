import type { DeliverySettings } from '@/config/types';
import type { Messages } from '@/i18n/types';

/** The form's words in the page's language. */
export type ContactFormLabels = Messages['home']['contact']['form'];

export interface MessageFieldsProps {
  /** Public EmailJS settings. */
  settings: DeliverySettings;
  /** Labels, button text, status and validation messages. */
  labels: ContactFormLabels;
}
