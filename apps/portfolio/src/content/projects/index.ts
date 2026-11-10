import type { ToolName } from '@/content/tools/marks';
import type { Messages } from '@/i18n/types';
import type { ProjectKind } from './kind';

/** A project's permanent slug. Older versions of the portfolio link to these. */
export type ProjectSlug = keyof Messages['projects']['items'];

/** Structure and media for one project. Its words live in each language's `projects` catalog. */
export interface Project {
  slug: ProjectSlug;
  kind: ProjectKind;
  stack: readonly ToolName[];
  cover: string;
  smallCover?: string;
  /** A gallery-scale composition. Keep the uncropped captures above for inspection. */
  preview?: string;
  logo?: string;
}

export const projects: readonly Project[] = [
  {
    slug: 'props',
    kind: 'career',
    stack: ['React Native', 'React', 'Redux', 'TypeScript', 'REST APIs', 'Stripe'],
    cover: 'props-website',
    smallCover: 'props-signup',
    logo: 'props',
  },
  {
    slug: 'benev',
    kind: 'career',
    stack: ['React', 'Redux', 'TypeScript', 'Styled Components', 'Stripe'],
    cover: 'benev-home',
    logo: 'benev',
  },
  {
    slug: 'sorting-visualizer',
    kind: 'personal',
    stack: ['React', 'TypeScript', 'HTML', 'CSS'],
    cover: 'current/sorting-visualizer-wide',
    smallCover: 'current/sorting-visualizer-small',
    preview: 'previews/sorting-visualizer',
  },
  {
    slug: 'pathfinding-visualizer',
    kind: 'personal',
    stack: ['React', 'TypeScript'],
    cover: 'current/pathfinding-visualizer-wide',
    smallCover: 'current/pathfinding-visualizer-small',
    preview: 'previews/pathfinding-visualizer',
  },
  {
    slug: '3d-sorting-visualizer',
    kind: 'personal',
    stack: ['React', 'Three.js'],
    cover: 'current/3d-sorting-visualizer-wide',
    smallCover: 'current/3d-sorting-visualizer-small',
    // From the archived walkthrough at 00:19.72, looking along the bars.
    preview: 'previews/3d-sorting-visualizer',
  },
  {
    slug: 'solar-system',
    kind: 'personal',
    stack: ['React', 'Three.js', 'JavaScript'],
    cover: 'current/solar-system-wide',
    smallCover: 'current/solar-system-small',
    // From the archived fly-through at 00:06.34, near the Sun.
    preview: 'previews/solar-system',
  },
];

export const projectSlugs: readonly ProjectSlug[] = projects.map(({ slug }) => slug);

export function projectHref(slug: ProjectSlug) {
  return `/projects/${slug}/`;
}

export const mediaDimensions: Readonly<Record<string, readonly [number, number]>> = {
  'previews/sorting-visualizer': [1163, 727],
  'previews/pathfinding-visualizer': [1066, 666],
  'previews/3d-sorting-visualizer': [912, 570],
  'previews/solar-system': [944, 590],
  'current/sorting-visualizer-wide': [1440, 900],
  'current/pathfinding-visualizer-wide': [1440, 900],
  'current/3d-sorting-visualizer-wide': [1440, 900],
  'current/solar-system-wide': [1440, 900],
  props: [480, 480],
  'props-ad-parents': [1440, 756],
  'props-signup': [560, 1213],
  'props-edit-profile': [560, 1213],
  'props-iap': [560, 1213],
  'props-website': [1440, 807],
  benev: [768, 461],
  'benev-home': [1440, 807],
  'benev-payments': [1440, 807],
  'benev-checkout': [1440, 807],
  'sorting-visualizer': [1400, 980],
  'pathfinding-visualizer': [1440, 824],
  '3d-sorting-visualizer': [1440, 971],
  'solar-system': [1440, 888],
};

export function imagePath(name: string) {
  return `/work/${name}.webp`;
}
