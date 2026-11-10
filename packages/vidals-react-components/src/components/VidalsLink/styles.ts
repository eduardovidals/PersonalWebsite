import type { VidalsLinkVariant } from './types.js';

export const baseStyles = 'rounded-sm transition-colors motion-reduce:transition-none';

export const variantStyles: Record<VidalsLinkVariant, string> = {
  inline:
    'text-vidals-accent underline decoration-vidals-accent/45 underline-offset-4 hover:decoration-current pressed:text-vidals-highlight',
  primary:
    'relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full bg-vidals-text px-6 text-sm font-semibold text-vidals-background hover:bg-vidals-accent pressed:bg-vidals-highlight',
  secondary:
    'relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-full bg-vidals-surface px-5 text-sm font-semibold text-vidals-text ring-1 ring-white/10 hover:bg-vidals-poster pressed:bg-vidals-poster',
  plain: '',
};
