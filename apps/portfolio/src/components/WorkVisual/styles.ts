export const captionStyles =
  'mt-2 flex flex-wrap items-center justify-between gap-x-3 text-xs leading-relaxed text-vidals-muted';

/** Phones and tablets open the tall capture; desktops open the wide one. */
export const fullSizeLinkStyles = {
  phone: 'inline-flex min-h-11 items-center text-vidals-accent lg:hidden',
  desktop: 'hidden min-h-11 items-center text-vidals-accent lg:inline-flex',
} satisfies Record<string, string>;
