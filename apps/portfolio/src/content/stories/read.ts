import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { LocaleId } from '@/i18n/locales';

/** Story names: each project's slug plus the Velton and About stories. */
export type StoryName = string;

/** Reads a Markdown story at build time. Callers pass catalog-known names only, never user input. */
export function readStory(locale: LocaleId, name: StoryName) {
  return readFile(
    path.join(process.cwd(), 'src', 'content', 'stories', locale, `${name}.md`),
    'utf8',
  );
}
