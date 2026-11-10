export const rootStyles = 'group';

// Without JavaScript the trigger cannot toggle, so it steps aside; the theme keeps the panel open.
export const triggerStyles =
  'inline-flex min-h-11 max-w-full cursor-pointer items-center gap-2 rounded-md text-start text-sm font-semibold text-vidals-accent noscript:hidden';

// React Aria measures the panel into --disclosure-panel-height so the height can animate; the clip
// margin keeps keyboard focus rings inside the panel visible.
export const panelStyles =
  'h-(--disclosure-panel-height) overflow-clip [overflow-clip-margin:0.5rem] motion-safe:transition-[height] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]';
