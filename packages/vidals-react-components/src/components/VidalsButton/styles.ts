import type { VidalsButtonVariant } from './types.js';

export const baseStyles =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vidals-accent disabled:cursor-not-allowed pending:cursor-wait';

export const variantStyles: Record<VidalsButtonVariant, string> = {
  primary:
    'border-vidals-accent bg-vidals-accent text-vidals-background hover:border-vidals-text hover:bg-vidals-text pressed:border-vidals-muted pressed:bg-vidals-muted disabled:border-vidals-border disabled:bg-vidals-surface disabled:text-vidals-muted',
  subtle:
    'border-vidals-border bg-transparent text-vidals-text hover:border-vidals-accent hover:text-vidals-accent pressed:bg-vidals-surface disabled:text-vidals-muted',
};
