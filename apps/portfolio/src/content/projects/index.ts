import type { ToolName } from '@/content/tools/marks';

// The public slugs are permanent: older versions of the portfolio link to them.
export interface Project {
  slug: string;
  title: string;
  category: string;
  context: string;
  description: string;
  stack: readonly ToolName[];
  cover: string;
  smallCover?: string;
  // A gallery-scale composition. Keep the uncropped captures above for inspection.
  preview?: string;
  coverAlt: string;
  logo?: string;
}

export const projects: readonly Project[] = [
  {
    slug: 'props',
    title: 'Props',
    category: 'Product engineering',
    context: 'Smarttwigs internship',
    description:
      'I learned REST by building a leaderboard people could actually use, alongside mobile screens and subscription checkout.',
    stack: ['React Native', 'React', 'Redux', 'TypeScript', 'REST APIs', 'Stripe'],
    cover: 'props-website',
    smallCover: 'props-signup',
    coverAlt: 'Archived Props account setup, from registration to choosing a subscription plan.',
    logo: 'props',
  },
  {
    slug: 'benev',
    title: 'Benev',
    category: 'Product engineering',
    context: 'Smarttwigs internship',
    description:
      'I built the carousel for choosing a membership plan and connected the choice to Stripe checkout.',
    stack: ['React', 'Redux', 'TypeScript', 'Styled Components', 'Stripe'],
    cover: 'benev-home',
    coverAlt: 'Benev’s welcome screen, with an illustrated sidebar and a choice of account types.',
    logo: 'benev',
  },
  {
    slug: 'sorting-visualizer',
    title: 'Sorting Visualizer',
    category: 'Algorithm visualization',
    context: 'AlgoVisual',
    description:
      'Three algorithms can finish with the same sorted list. I animated the steps so you can see the different work each one does.',
    stack: ['React', 'TypeScript', 'HTML', 'CSS'],
    cover: 'current/sorting-visualizer-wide',
    smallCover: 'current/sorting-visualizer-small',
    preview: 'previews/sorting-visualizer',
    coverAlt: 'Light-blue bars rearranging during merge sort in AlgoVisual.',
  },
  {
    slug: 'pathfinding-visualizer',
    title: 'Pathfinding Visualizer',
    category: 'Algorithm visualization',
    context: 'AlgoVisual',
    description:
      'Watch where a search looks before it finds a route. Keep the walls in place, switch algorithms, and see what changes.',
    stack: ['React', 'TypeScript'],
    cover: 'current/pathfinding-visualizer-wide',
    smallCover: 'current/pathfinding-visualizer-small',
    preview: 'previews/pathfinding-visualizer',
    coverAlt: 'A* search tracing a route through a generated maze in AlgoVisual.',
  },
  {
    slug: '3d-sorting-visualizer',
    title: '3D Sorting Visualizer',
    category: 'Computer graphics',
    context: 'NJCU coursework',
    description:
      'For a computer graphics class, I took my sorting bars off the page and made a scene you could walk through while they moved.',
    stack: ['React', 'Three.js'],
    cover: 'current/3d-sorting-visualizer-wide',
    smallCover: 'current/3d-sorting-visualizer-small',
    // From the archived walkthrough at 00:19.72, looking along the bars.
    preview: 'previews/3d-sorting-visualizer',
    coverAlt: 'Merge sort rearranging upright bars in a 3D scene.',
  },
  {
    slug: 'solar-system',
    title: 'Solar System',
    category: 'Computer graphics',
    context: 'NJCU coursework',
    description:
      'I used planets to learn how motion fits together in a 3D scene: a planet can spin on its own axis while it circles the sun.',
    stack: ['React', 'Three.js', 'JavaScript'],
    cover: 'current/solar-system-wide',
    smallCover: 'current/solar-system-small',
    // From the archived fly-through at 00:06.34, near the Sun.
    preview: 'previews/solar-system',
    coverAlt: 'Textured Sun and planets on orbital paths against a starfield.',
  },
];

export const projectSlugs: readonly string[] = projects.map(({ slug }) => slug);

export function projectHref(slug: string) {
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
