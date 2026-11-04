import { contactEmail } from '@/config/site';
import { publicMailSettings } from '@/config/server';
import { MessageFields } from './MessageFields';

/** Static contact details always work; the delivery form is offered only when configured. */
export function ContactForm() {
  const settings = publicMailSettings();
  return (
    <div className="border-l-2 border-vidals-accent bg-vidals-surface p-6 text-vidals-text sm:p-8">
      {settings && <MessageFields settings={settings} />}
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-vidals-muted">
        Direct line
      </p>
      <a
        className="inline-block max-w-full break-all font-semibold underline decoration-vidals-accent underline-offset-4 hover:text-vidals-accent"
        href={'mailto:' + contactEmail}
      >
        {contactEmail} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
