import { VidalsLink } from '@vidals/react-components';
import { twMerge } from 'tailwind-merge';
import { Arrow } from '@/components/Arrow';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { HomeSection, headingStyles } from '../HomeSection';
import { currentDotStyles, dotStyles, entryStyles, gridStyles, pastDotStyles } from './styles';
import type { CareerJourneyProps as Props } from './types';

/** Dates for each role, oldest first, in the same order as `home.career.jobs`. */
const tenures = [
  { start: '2021-10', end: '2022-05' },
  { start: '2022-06', end: '2023-07' },
  { start: '2023-07', end: '2026-03' },
  { start: '2026-03', end: null },
] as const;

/**
 * The career timeline, oldest first, so it tells the story up to the current role.
 * @example
 * ```tsx
 * <CareerJourney locale="en" />
 * ```
 */
export async function CareerJourney(props: Props) {
  const { locale } = props;
  const { messages, monthYear } = await getTranslator(locale);
  const career = messages.home.career;

  return (
    <HomeSection id="about" labelledBy="about-heading">
      <div className={gridStyles}>
        <div className="max-w-[42ch]">
          <p className="mb-3 font-mono text-xs text-vidals-accent">{career.eyebrow}</p>
          <h2 id="about-heading" className={headingStyles}>
            {career.title}
          </h2>
          <p className="mt-5 leading-relaxed text-vidals-muted">{career.body}</p>
          <VidalsLink variant="secondary" href={localizedPath(locale, '/about/')} className="mt-5">
            {career.readStory} <Arrow />
          </VidalsLink>
        </div>
        <div className="min-w-0">
          <ol aria-label={career.timeline} className="ms-1.5">
            {career.jobs.map((job, index) => {
              const tenure = tenures[index];
              if (!tenure) return null;
              return (
                <li key={tenure.start} className={entryStyles}>
                  <span
                    aria-hidden="true"
                    className={twMerge(dotStyles, tenure.end ? pastDotStyles : currentDotStyles)}
                  />
                  <p className="font-mono text-xs leading-5 text-vidals-muted">
                    <time dateTime={tenure.start}>{monthYear(tenure.start)}</time> –{' '}
                    {tenure.end ? (
                      <time dateTime={tenure.end}>{monthYear(tenure.end)}</time>
                    ) : (
                      career.present
                    )}
                  </p>
                  <h3 className="mt-1 text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                    {job.company}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-vidals-accent">{job.role}</p>
                  <p className="mt-2 max-w-[59ch] text-pretty leading-relaxed text-vidals-muted">
                    {job.story}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </HomeSection>
  );
}
