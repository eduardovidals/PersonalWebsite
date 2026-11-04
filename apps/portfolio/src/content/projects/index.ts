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
    cover: 'props-ad-parents',
    coverAlt: 'Artwork from Props showing a family alongside the words “Rewarding good behavior!”',
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
    cover: 'sorting-visualizer',
    coverAlt: 'Uneven blue bars represent values in an array before they are sorted.',
  },
  {
    slug: 'pathfinding-visualizer',
    title: 'Pathfinding Visualizer',
    category: 'Algorithm visualization',
    context: 'AlgoVisual',
    description:
      'Watch where a search looks before it finds a route. Keep the walls in place, switch algorithms, and see what changes.',
    stack: ['React', 'TypeScript'],
    cover: 'pathfinding-visualizer',
    coverAlt: 'An explored path crosses a square grid, winding between dark walls.',
  },
  {
    slug: '3d-sorting-visualizer',
    title: '3D Sorting Visualizer',
    category: 'Computer graphics',
    context: 'NJCU coursework',
    description:
      'For a computer graphics class, I took my sorting bars off the page and made a scene you could walk through while they moved.',
    stack: ['React', 'Three.js'],
    cover: '3d-sorting-visualizer',
    coverAlt: 'A row of 3D sorting bars casts long shadows across a plane.',
  },
  {
    slug: 'solar-system',
    title: 'Solar System',
    category: 'Computer graphics',
    context: 'NJCU coursework',
    description:
      'I used planets to learn how motion fits together in a 3D scene: a planet can spin on its own axis while it circles the sun.',
    stack: ['React', 'Three.js', 'JavaScript'],
    cover: 'solar-system',
    coverAlt: 'Textured planets orbit a bright sun against a dark star field.',
  },
];

export const projectSlugs: readonly string[] = projects.map(({ slug }) => slug);

export function projectHref(slug: string) {
  return `/projects/${slug}/`;
}

export const mediaDimensions: Readonly<Record<string, readonly [number, number]>> = {
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
