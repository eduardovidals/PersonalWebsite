import { contactEmail } from '@/config/site';
import { publicMailSettings } from '@/config/server';
import { MessageFields } from './MessageFields';

/** Static contact details always work; the delivery form is offered only when configured. */
export function ContactForm() {
  const settings = publicMailSettings();
  return (
    <div className="border-l-2 border-accent bg-mist p-6 text-ink sm:p-8">
      {settings && <MessageFields settings={settings} />}
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
        Direct line
      </p>
      <a
        className="inline-block max-w-full break-all font-semibold underline decoration-accent underline-offset-4 hover:text-accent"
        href={'mailto:' + contactEmail}
      >
        {contactEmail} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
