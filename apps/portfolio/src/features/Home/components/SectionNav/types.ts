/** One homepage section tab. */
export interface SectionLink {
  /** The section's element ID, also its URL fragment. */
  id: string;
  /** The tab's visible words. */
  label: string;
}

export interface SectionNavProps {
  /** Accessible name of the navigation landmark, also shown before the tabs on wider screens. */
  label: string;
  /** Sections in page order. */
  sections: readonly SectionLink[];
}
