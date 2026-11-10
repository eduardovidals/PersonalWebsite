import type { HomeSectionTone } from './types';

export const sectionStyles = 'border-t border-vidals-border/35';
export const toneStyles: Record<HomeSectionTone, string> = {
  plain: 'bg-vidals-background',
  tinted: 'bg-vidals-paper',
  closing: 'bg-vidals-poster',
};
export const innerStyles = 'shell py-12 sm:py-16 lg:py-20';

/** Shared size for every homepage section heading. */
export const headingStyles =
  'text-balance text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.08] font-semibold tracking-[-.045em]';
