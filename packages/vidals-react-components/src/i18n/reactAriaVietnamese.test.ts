import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  LocalizedStringDictionary,
  LocalizedStringFormatter,
  type LocalizedString,
  type Variables,
} from '@internationalized/string';
import { beforeAll, describe, expect, it } from 'vitest';
import { getReactAriaStringsScript } from './ReactAriaStrings/index.js';
import { reactAriaVietnamese } from './reactAriaVietnamese.js';

/** Installed package roots, resolved the way React Aria Components resolves them. */
const componentsRoot = dirname(
  createRequire(import.meta.url).resolve('react-aria-components/package.json'),
);
const requireFromComponents = createRequire(join(componentsRoot, 'package.json'));
const roots = {
  'react-aria-components': componentsRoot,
  'react-aria': dirname(requireFromComponents.resolve('react-aria/package.json')),
  'react-stately': dirname(requireFromComponents.resolve('react-stately/package.json')),
};

/** Each `dist/private/intl/<folder>` and the package name its strings are requested under. */
const reactAriaFolders: Record<string, string> = {
  autocomplete: '@react-aria/autocomplete',
  breadcrumbs: '@react-aria/breadcrumbs',
  calendar: '@react-aria/calendar',
  color: '@react-aria/color',
  combobox: '@react-aria/combobox',
  datepicker: '@react-aria/datepicker',
  dnd: '@react-aria/dnd',
  grid: '@react-aria/grid',
  menu: '@react-aria/menu',
  numberfield: '@react-aria/numberfield',
  overlays: '@react-aria/overlays',
  // usePreviewTrigger imports these but requests them as '@react-aria/link-preview'.
  previewtrigger: '@react-aria/link-preview',
  searchfield: '@react-aria/searchfield',
  spinbutton: '@react-aria/spinbutton',
  steplist: '@react-aria/steplist',
  table: '@react-aria/table',
  tag: '@react-aria/tag',
  toast: '@react-aria/toast',
  tree: '@react-aria/tree',
};
const reactStatelyFolders: Record<string, string> = {
  color: '@react-stately/color',
  datepicker: '@react-stately/datepicker',
};

const englishSources = [
  ...Object.entries(reactAriaFolders).map(([folder, packageName]) => ({
    packageName,
    file: join(roots['react-aria'], 'dist/private/intl', folder, 'en-US.mjs'),
  })),
  ...Object.entries(reactStatelyFolders).map(([folder, packageName]) => ({
    packageName,
    file: join(roots['react-stately'], 'dist/private/intl', folder, 'en-US.mjs'),
  })),
  {
    packageName: 'react-aria-components',
    file: join(roots['react-aria-components'], 'dist/private/intl/en-US.mjs'),
  },
];

describe('reactAriaVietnamese', () => {
  it('maps every installed English string folder', () => {
    expect(intlFolders(roots['react-aria'])).toEqual(Object.keys(reactAriaFolders).sort());
    expect(intlFolders(roots['react-stately'])).toEqual(Object.keys(reactStatelyFolders).sort());
  });

  it('covers exactly the packages the installed React Aria code requests', () => {
    const requested = requestedPackages();
    expect(englishSources.map((source) => source.packageName).sort()).toEqual(requested);
    expect(Object.keys(reactAriaVietnamese).sort()).toEqual(requested);
  });

  it.each(englishSources)(
    'has every $packageName key with the same kind of value',
    async ({ packageName, file }) => {
      const english = await loadStrings(file);
      expect(Object.hasOwn(reactAriaVietnamese, packageName)).toBe(true);
      const vietnamese = reactAriaVietnamese[packageName];

      expect(Object.keys(vietnamese).sort()).toEqual(Object.keys(english).sort());
      for (const [key, value] of Object.entries(english)) {
        expect(typeof vietnamese[key], `${packageName} ${key}`).toBe(typeof value);
        expect(vietnamese[key], `${packageName} ${key}`).not.toBe('');
      }
    },
  );

  describe('through the page script and a real LocalizedStringFormatter', () => {
    beforeAll(() => {
      const script = getReactAriaStringsScript('vi');
      if (script === null) throw new Error('No script for vi');
      // Runs exactly what ReactAriaStrings renders, so the strings survive serialization.
      new Function(script)();
    });

    it.each(englishSources)('formats every $packageName message', async ({ packageName, file }) => {
      const english = await loadStrings(file);
      const englishFormatter = new LocalizedStringFormatter(
        'en-US',
        new LocalizedStringDictionary({ 'en-US': english }),
      );
      const dictionary = LocalizedStringDictionary.getGlobalDictionaryForPackage(packageName);
      if (!dictionary) throw new Error(`No global strings for ${packageName}`);
      const formatter = new LocalizedStringFormatter('vi', dictionary);

      for (const [key, value] of Object.entries(english)) {
        if (typeof value === 'string') {
          expect(formatter.format(key)).toBe(reactAriaVietnamese[packageName][key]);
          continue;
        }
        for (const sample of sampleArgs(value)) {
          const label = `${packageName} ${key} ${JSON.stringify(sample.args)}`;
          const englishText = englishFormatter.format(key, sample.args);
          const text = formatter.format(key, sample.args);

          expect(text.trim(), label).not.toBe('');
          expect(text, label).not.toMatch(/undefined|NaN|\[object/);
          // Whatever the English shows of an argument, the Vietnamese shows too, and vice versa.
          for (const expected of sample.expected) {
            expect(text.includes(expected.vi), `${label} ${expected.vi}`).toBe(
              englishText.includes(expected.en),
            );
          }
        }
      }
    });
  });
});

function intlFolders(root: string): string[] {
  const intl = join(root, 'dist/private/intl');
  return readdirSync(intl, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(intl, entry.name, 'en-US.mjs')))
    .map((entry) => entry.name)
    .sort();
}

/** Every package name the installed ESM passes to React Aria's string hooks or global lookup. */
function requestedPackages(): string[] {
  const names = new Set<string>();
  for (const root of Object.values(roots)) {
    const dist = join(root, 'dist');
    for (const file of readdirSync(dist, { recursive: true, encoding: 'utf8' })) {
      if (!file.endsWith('.mjs')) continue;
      for (const line of readFileSync(join(dist, file), 'utf8').split('\n')) {
        if (line.trimStart().startsWith('//')) continue;
        for (const match of line.matchAll(
          /'(@react-(?:aria|stately)\/[\w-]+|react-aria-components)'\)/g,
        )) {
          names.add(match[1]);
        }
      }
    }
  }
  return [...names].sort();
}

async function loadStrings(file: string): Promise<Record<string, LocalizedString>> {
  const loaded: unknown = await import(/* @vite-ignore */ pathToFileURL(file).href);
  if (!isRecord(loaded) || !isLocalizedStrings(loaded.default)) {
    throw new Error(`${file} does not export localized strings`);
  }
  return loaded.default;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isLocalizedStrings(value: unknown): value is Record<string, LocalizedString> {
  return (
    isRecord(value) &&
    Object.values(value).every((item) => typeof item === 'string' || typeof item === 'function')
  );
}

interface Sample {
  args: Variables;
  /** Argument text as each locale formats it. */
  expected: { en: string; vi: string }[];
}

/**
 * Representative arguments for an English message, read from its source: counts and numbers get
 * 0, 1 and 1234, `select` values get true and false, and every other argument a marker string.
 */
function sampleArgs(message: Exclude<LocalizedString, string>): Sample[] {
  const source = message.toString();
  const names = new Set([...source.matchAll(/args\.(\w+)/g)].map((match) => match[1]));
  const numeric = new Set(
    [...source.matchAll(/(?:plural|number)\(args\.(\w+)/g)].map((match) => match[1]),
  );
  const selected = new Set([...source.matchAll(/\},\s*args\.(\w+)\)/g)].map((match) => match[1]));
  if (names.size === 0) throw new Error(`No arguments found in ${source}`);

  const counts = numeric.size > 0 ? [0, 1, 1234] : [1234];
  const flags = selected.size > 0 ? [true, false] : [true];
  return counts.flatMap((count) =>
    flags.map((flag) => {
      const expected: Sample['expected'] = [];
      const args = Object.fromEntries(
        [...names].map((name): [string, string | number | boolean] => {
          if (numeric.has(name)) {
            if (count === 1234) {
              expected.push({
                en: new Intl.NumberFormat('en-US').format(count),
                vi: new Intl.NumberFormat('vi').format(count),
              });
            }
            return [name, count];
          }
          if (selected.has(name)) return [name, flag];
          const marker = `«${name}»`;
          expected.push({ en: marker, vi: marker });
          return [name, marker];
        }),
      );
      return { args, expected };
    }),
  );
}
