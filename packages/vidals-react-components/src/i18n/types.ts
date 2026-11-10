/** Forms for the formatter's `plural` and `select` helpers, keyed by category or `=N`. */
export type ReactAriaFormatterOptions = Record<string, string | (() => string)>;

/**
 * The helpers React Aria's `LocalizedStringFormatter` passes to a function-valued string. Its
 * declarations mark them `protected`, but every bundled React Aria translation calls them.
 */
export interface ReactAriaStringFormatter {
  /** Picks the form for `count`; an exact `=N` key wins over the locale's plural category. */
  plural(count: number, options: ReactAriaFormatterOptions, type?: Intl.PluralRuleType): string;
  /** Formats `value` with the locale's digits and grouping. */
  number(value: number): string;
  /** Picks `options[value]`, falling back to `options.other`. */
  select(options: ReactAriaFormatterOptions, value: string): string;
}

/**
 * One React Aria string. Functions are sent to the browser as source text, so they may use only
 * their arguments and JavaScript built-ins.
 */
export type ReactAriaLocalizedString =
  string | ((args: Record<string, unknown>, formatter: ReactAriaStringFormatter) => string);

/** Strings keyed by the package name React Aria passes to its string hooks, then by message key. */
export type ReactAriaPackageStrings = Readonly<
  Record<string, Readonly<Record<string, ReactAriaLocalizedString>>>
>;
