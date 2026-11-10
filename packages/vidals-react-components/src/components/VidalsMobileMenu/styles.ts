export const overlayStyles =
  'fixed inset-x-0 bottom-0 z-20 bg-vidals-background/55 backdrop-blur-[2px] entering:animate-[menu-fade_240ms_ease-out] exiting:animate-[menu-fade_200ms_ease-in_reverse_forwards] motion-reduce:entering:animate-none motion-reduce:exiting:animate-none';

export const modalStyles =
  'border-b border-white/10 bg-vidals-background shadow-2xl shadow-black/40 outline-none entering:animate-[menu-in_340ms_cubic-bezier(0.23,1,0.32,1)] exiting:animate-[menu-out_200ms_ease-in_forwards] motion-reduce:entering:animate-none motion-reduce:exiting:animate-none';

export const dialogStyles =
  'mx-auto w-full max-w-[82rem] px-[clamp(1.15rem,4vw,3rem)] pt-1 pb-4 outline-none';

export const itemStyles =
  'relative flex min-h-14 items-center justify-between overflow-hidden rounded-xl px-3 font-display text-2xl font-medium tracking-tight text-vidals-text hover:bg-vidals-surface pressed:bg-vidals-surface current:text-vidals-accent';

export const secondaryListStyles = 'menu-item mt-2 flex flex-wrap gap-x-2';

export const secondaryItemStyles =
  'flex min-h-12 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-vidals-muted hover:text-vidals-accent';
