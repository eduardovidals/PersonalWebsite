import { getTranslator } from '@/i18n/translator';
import { CareerJourney } from './components/CareerJourney';
import { Contact } from './components/Contact';
import { Intro } from './components/Intro';
import { SectionNav } from './components/SectionNav';
import { SelectedWork } from './components/SelectedWork';
import { Toolkit } from './components/Toolkit';
import type { HomeProps as Props } from './types';

/**
 * The homepage: introduction, section tabs, then work, career, toolkit and contact.
 * @example
 * ```tsx
 * <Home locale="en" />
 * ```
 */
export async function Home(props: Props) {
  const { locale } = props;
  const { messages } = await getTranslator(locale);
  const tabs = messages.home.sectionNav;

  return (
    <>
      <Intro locale={locale} />
      <SectionNav
        label={tabs.label}
        sections={[
          { id: 'projects', label: tabs.work },
          { id: 'about', label: tabs.career },
          { id: 'skills', label: tabs.toolkit },
          { id: 'contact', label: tabs.contact },
        ]}
      />
      <SelectedWork locale={locale} />
      <CareerJourney locale={locale} />
      <Toolkit locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
