// The public slugs are permanent: older versions of the portfolio link to them.
export interface Project {
  slug: string;
  title: string;
  category: string;
  context: string;
  description: string;
  stack: readonly string[];
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
      'Building the APIs, mobile screens, and subscription checkout behind a team recognition app.',
    stack: ['React Native', 'React', 'Redux', 'TypeScript', 'Stripe'],
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
      'Designing a reusable plan carousel and integrating Stripe checkout for a social impact platform.',
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
    description: 'Turning Merge Sort, Quick Sort, and Heap Sort into step-by-step animations.',
    stack: ['React', 'TypeScript'],
    cover: 'sorting-visualizer',
    coverAlt: 'Uneven blue bars represent values in an array before they are sorted.',
  },
  {
    slug: 'pathfinding-visualizer',
    title: 'Pathfinding Visualizer',
    category: 'Algorithm visualization',
    context: 'AlgoVisual',
    description:
      'Exploring how search algorithms choose a route through walls and weighted terrain.',
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
      'Taking sorting algorithms into a 3D scene that you can walk through as the values move.',
    stack: ['React', 'Three.js'],
    cover: '3d-sorting-visualizer',
    coverAlt: 'A row of 3D sorting bars casts long shadows across a plane.',
  },
  {
    slug: 'solar-system',
    title: 'Solar System',
    category: 'Computer graphics',
    context: 'NJCU coursework',
    description: 'Using orbits, textures, and a movable camera to make a solar system explorable.',
    stack: ['React', 'Three.js'],
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
