import type { about } from './messages/en/about';
import type { common } from './messages/en/common';
import type { format } from './messages/en/format';
import type { home } from './messages/en/home';
import type { projects } from './messages/en/projects';
import type { velton } from './messages/en/velton';

/** Turns the English catalog's literal strings into `string`, so other languages can satisfy it. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly Widen<Item>[]
    : { readonly [Key in keyof T]: Widen<T[Key]> };

type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

/** A dynamic message, named without i18next's plural suffix. */
export type FormatKey = keyof typeof format extends infer Key
  ? Key extends `${infer Base}_${PluralCategory}`
    ? Base
    : Key
  : never;

/** i18next format strings. Each language supplies the plural forms its grammar needs; anything
 * missing falls back to English. */
export type FormatMessages = Partial<Record<FormatKey | `${FormatKey}_${PluralCategory}`, string>>;

/** Values interpolated into a format string. `count` also selects the plural form. */
export type FormatValues = Record<string, string | number>;

/** Every catalog has the English catalog's shape, except `format`, whose plural keys follow each
 * language's grammar. */
export type Messages = Widen<{
  common: typeof common;
  home: typeof home;
  projects: typeof projects;
  about: typeof about;
  velton: typeof velton;
}> & { readonly format: FormatMessages };
