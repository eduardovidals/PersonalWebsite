import { VidalsDisclosure, VidalsLinkLabel } from '@vidals/react-components';
import { twMerge } from 'tailwind-merge';
import { ToolChips } from '@/components/ToolChips';
import { getTranslator } from '@/i18n/translator';
import { HomeSection, headingStyles } from '../HomeSection';
import { chevronStyles, groupHeadingStyles, moreGridStyles, moreTriggerStyles } from './styles';
import { aiTools, featuredTools, toolkit } from './toolkitData';
import type { ToolkitProps as Props } from './types';

const featuredNames = new Set<string>(featuredTools);
const moreTools = toolkit
  .map(({ id, tools }) => ({ id, tools: tools.filter((tool) => !featuredNames.has(tool)) }))
  .filter(({ tools }) => tools.length > 0);

/**
 * The tools Eduardo uses every day, the AI agents he works with, and the rest behind a
 * disclosure, grouped by purpose.
 * @example
 * ```tsx
 * <Toolkit locale="en" />
 * ```
 */
export async function Toolkit(props: Props) {
  const { locale } = props;
  const { messages, format } = await getTranslator(locale);
  const copy = messages.home.toolkit;

  return (
    <HomeSection id="skills" labelledBy="toolkit-heading" tone="tinted">
      <h2 id="toolkit-heading" className={twMerge(headingStyles, 'mb-5 sm:mb-7')}>
        {copy.title}
      </h2>
      <div className="max-w-4xl">
        <p className="mb-4 max-w-[58ch] leading-relaxed text-vidals-muted">{copy.intro}</p>
        <ToolChips tools={featuredTools} label={copy.everyday} />
        <h3 className="mt-6 mb-2.5 text-sm font-semibold text-vidals-muted">{copy.aiHeading}</h3>
        <ToolChips tools={aiTools} label={copy.aiList} />
      </div>
      <VidalsDisclosure
        className="mt-4"
        triggerClassName={moreTriggerStyles}
        trigger={
          <>
            <VidalsLinkLabel className="group-expanded:hidden">{copy.more}</VidalsLinkLabel>
            <VidalsLinkLabel className="hidden group-expanded:inline">{copy.fewer}</VidalsLinkLabel>
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={chevronStyles}>
              <path
                d="m3 6 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        }
      >
        <div className={moreGridStyles}>
          {moreTools.map(({ id, tools }) => (
            <div key={id} className="min-w-0">
              <h3 className={groupHeadingStyles}>{copy.groups[id]}</h3>
              <ToolChips tools={tools} label={format('toolsFor', { group: copy.groups[id] })} />
            </div>
          ))}
        </div>
      </VidalsDisclosure>
    </HomeSection>
  );
}
