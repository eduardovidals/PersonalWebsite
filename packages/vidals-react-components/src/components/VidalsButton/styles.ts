import type { VidalsButtonVariant } from './types.js';

export const baseStyles =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none data-focus-visible:outline-2 data-focus-visible:outline-offset-4 data-focus-visible:outline-vidals-accent data-disabled:cursor-not-allowed data-pending:cursor-wait';

export const variantStyles: Record<VidalsButtonVariant, string> = {
  primary:
    'border-vidals-accent bg-vidals-accent text-vidals-background data-hovered:bg-vidals-text data-hovered:border-vidals-text data-pressed:bg-vidals-muted data-pressed:border-vidals-muted data-disabled:bg-vidals-surface data-disabled:border-vidals-border data-disabled:text-vidals-muted',
  subtle:
    'border-vidals-border bg-transparent text-vidals-text data-hovered:border-vidals-accent data-hovered:text-vidals-accent data-pressed:bg-vidals-surface data-disabled:text-vidals-muted',
};
