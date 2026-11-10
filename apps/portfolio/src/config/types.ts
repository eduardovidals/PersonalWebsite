/** Public EmailJS browser configuration, never a private mail-service credential. */
export interface DeliverySettings {
  serviceId: string;
  templateId: string;
  publicKey: string;
}
