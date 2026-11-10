import { twMerge } from 'tailwind-merge';
import { innerStyles, sectionStyles, toneStyles } from './styles';
import type { HomeSectionProps as Props } from './types';

/**
 * One full-width homepage section, named by its heading and reachable from the section tabs.
 * @example
 * ```tsx
 * <HomeSection id="skills" labelledBy="toolkit-heading" tone="tinted">
 *   <h2 id="toolkit-heading">Toolkit</h2>
 * </HomeSection>
 * ```
 */
export function HomeSection(props: Props) {
  const { id, labelledBy, tone = 'plain', children } = props;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={twMerge(sectionStyles, toneStyles[tone])}
    >
      <div className={innerStyles}>{children}</div>
    </section>
  );
}
