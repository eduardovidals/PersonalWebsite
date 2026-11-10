import { getTranslator } from '@/i18n/translator';
import { HomeSection, headingStyles } from '../HomeSection';
import { ContactForm } from './components/ContactForm';
import type { ContactProps as Props } from './types';

/**
 * The closing section: an invitation to get in touch beside the contact form.
 * @example
 * ```tsx
 * <Contact locale="en" />
 * ```
 */
export async function Contact(props: Props) {
  const { locale } = props;
  const { messages } = await getTranslator(locale);
  const copy = messages.home.contact;

  return (
    <HomeSection id="contact" labelledBy="contact-heading" tone="closing">
      <div className="grid items-center gap-7 md:grid-cols-[1.1fr_.9fr] md:gap-12">
        <div>
          <h2 id="contact-heading" className={headingStyles}>
            {copy.title}
          </h2>
          <p className="mt-4 max-w-[37ch] leading-relaxed text-vidals-muted sm:text-lg">
            {copy.body}
          </p>
        </div>
        <ContactForm locale={locale} />
      </div>
    </HomeSection>
  );
}
