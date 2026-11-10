// Each outer bar slides to the middle, then rotates; closing rotates back first, then slides apart.
export const barStyles =
  '[transform-box:fill-box] origin-center transition-[translate,rotate] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none';
export const barOpenTimingStyles = '[transition-delay:0ms,200ms]';
export const barClosedTimingStyles = '[transition-delay:200ms,0ms]';
export const topBarOpenStyles = 'translate-y-[5px] rotate-45';
export const bottomBarOpenStyles = '-translate-y-[5px] -rotate-45';
export const middleBarStyles = 'transition-opacity duration-150 motion-reduce:transition-none';
export const middleBarOpenStyles = 'opacity-0 [transition-delay:150ms]';
export const middleBarClosedStyles = '[transition-delay:250ms]';
export const iconStyles = 'size-5 overflow-visible';
