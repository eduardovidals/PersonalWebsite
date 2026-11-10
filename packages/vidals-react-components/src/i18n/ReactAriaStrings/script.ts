import { reactAriaVietnamese } from '../reactAriaVietnamese.js';
import type { ReactAriaLocalizedString, ReactAriaPackageStrings } from '../types.js';

/** Strings for each language React Aria does not ship, keyed by language subtag. */
const stringsByLanguage = new Map<string, ReactAriaPackageStrings>([['vi', reactAriaVietnamese]]);

const serializedStrings = new WeakMap<ReactAriaPackageStrings, string>();

/**
 * Returns the inline script that hands React Aria its strings for `locale`, in the format of React
 * Aria's own `getLocalizationScript`, or `null` when React Aria already ships that language or the
 * tag is not valid BCP 47. Use it where a `<script>` element cannot be rendered, such as to compute
 * a Content Security Policy hash.
 * @example
 * ```ts
 * const script = getReactAriaStringsScript('vi'); // "window[Symbol.for('react-aria.i18n.locale')]=…"
 * getReactAriaStringsScript('en'); // null
 * ```
 */
export function getReactAriaStringsScript(locale: string): string | null {
  const parsed = parseLocale(locale);
  const strings = parsed ? stringsByLanguage.get(parsed.language) : undefined;
  if (!parsed || !strings) return null;

  return `window[Symbol.for('react-aria.i18n.locale')]=${JSON.stringify(parsed.toString())};{${serializeStrings(strings)}}`;
}

function parseLocale(locale: string): Intl.Locale | null {
  try {
    return new Intl.Locale(locale);
  } catch {
    return null;
  }
}

function serializeStrings(strings: ReactAriaPackageStrings): string {
  const cached = serializedStrings.get(strings);
  if (cached !== undefined) return cached;

  const packages = Object.entries(strings).map(([name, messages]) => ({
    name,
    messages: Object.entries(messages).map(([key, value]) => ({ key, source: toSource(value) })),
  }));

  // Values used more than once become block-scoped variables, as in React Aria's serializer.
  const seen = new Set<string>();
  const shared = new Map<string, string>();
  for (const { messages } of packages) {
    for (const { source } of messages) {
      if (seen.has(source) && !shared.has(source)) shared.set(source, `_${shared.size}`);
      seen.add(source);
    }
  }

  const declarations = [...shared].map(([source, variable]) => `${variable}=${source}`);
  const body = packages
    .map(({ name, messages }) => {
      const entries = messages.map(
        ({ key, source }) => `${toKey(key)}:${shared.get(source) ?? source}`,
      );
      return `${toStringLiteral(name)}:{${entries.join(',')}}`;
    })
    .join(',');
  const script = `${declarations.length > 0 ? `let ${declarations.join(',')};` : ''}window[Symbol.for('react-aria.i18n.strings')]={${body}};`;

  serializedStrings.set(strings, script);
  return script;
}

function toSource(value: ReactAriaLocalizedString): string {
  return typeof value === 'string' ? toStringLiteral(value) : value.toString();
}

function toKey(key: string): string {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : toStringLiteral(key);
}

/** A JSON string literal that cannot close the surrounding `<script>` element. */
function toStringLiteral(value: string): string {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}
