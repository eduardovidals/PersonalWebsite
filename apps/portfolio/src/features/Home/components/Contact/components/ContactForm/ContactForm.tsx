import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import { Arrow } from '@/components/Arrow';
import { publicMailSettings } from '@/config/server';
import { contactEmail } from '@/config/site';
import { getTranslator } from '@/i18n/translator';
import { MessageFields } from './components/MessageFields';
import type { ContactFormProps as Props } from './types';

/**
 * The message form when delivery is configured, and a direct email link that always works, even
 * without the delivery service or JavaScript.
 * @example
 * ```tsx
 * <ContactForm locale="en" />
 * ```
 */
export async function ContactForm(props: Props) {
  const { locale } = props;
  const { messages } = await getTranslator(locale);
  const copy = messages.home.contact;
  const settings = publicMailSettings();

  return (
    <div className="min-w-0 rounded-[1.75rem] bg-vidals-surface p-5 text-vidals-text sm:p-7">
      {settings && <MessageFields settings={settings} labels={copy.form} />}
      <p className="mb-1 text-sm font-medium text-vidals-muted">{copy.emailDirectly}</p>
      <VidalsLink
        variant="plain"
        href={'mailto:' + contactEmail}
        className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg font-semibold break-all text-vidals-accent"
      >
        <VidalsLinkLabel>{contactEmail}</VidalsLinkLabel> <Arrow direction="up-right" />
      </VidalsLink>
    </div>
  );
}
