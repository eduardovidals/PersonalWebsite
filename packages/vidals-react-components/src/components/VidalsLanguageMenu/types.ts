/** One language the page is available in. */
export interface VidalsLanguageOption {
  /** BCP 47 tag, used for the item's `lang` and `hreflang`. */
  id: string;
  /** The language's name in that language, such as "Español". */
  label: string;
  /** The same page in that language. */
  href: string;
}

export interface VidalsLanguageMenuProps {
  /** Every available language, in display order. */
  options: readonly VidalsLanguageOption[];
  /** The `id` of the page's current language. */
  currentId: string;
  /** Read before the current language code to name the button and its menu, such as "Language". */
  label: string;
  /** Called with the chosen option's `id` before the page changes, such as to remember the choice. */
  onAction?: (id: string) => void;
  /** Classes for the button. */
  className?: string;
}
