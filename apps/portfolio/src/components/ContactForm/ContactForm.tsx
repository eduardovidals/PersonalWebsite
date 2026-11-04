import { contactEmail } from '@/config/site';
import { publicMailSettings } from '@/config/server';
import { MessageFields } from './MessageFields';

/** A direct email link also works when the optional delivery service is absent. */
export function ContactForm() {
  const settings = publicMailSettings();
  return (
    <div className="min-w-0 rounded-[1.75rem] bg-vidals-surface p-5 text-vidals-text sm:p-7">
      {settings && <MessageFields settings={settings} />}
      <p className="mb-1 text-sm font-medium text-vidals-muted">Email me directly</p>
      <a
        className="inline-flex min-h-11 max-w-full items-center gap-2 break-all rounded-lg font-semibold text-vidals-accent underline-offset-4 hover:underline"
        href={'mailto:' + contactEmail}
      >
        {contactEmail} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
