import type { ToolName } from '@/content/tools/marks';
import type { ProjectKind } from './kind';

export interface WorkSnapshot {
  id: string;
  kind: ProjectKind;
  title: string;
  description: string;
  href?: string;
  visual:
    | {
        kind: 'capture';
        alt: string;
        caption: string;
        detail: readonly [number, number];
        wide: readonly [number, number];
      }
    | { kind: 'illustration'; alt: string; caption: string }
    | { kind: 'planned'; status: string };
  stack: readonly ToolName[];
  ai?: readonly { kind: string; tools: readonly ToolName[]; note: string }[];
}

/** Public summaries only; an assistant used in development is not a shipped product feature. */
export const factorySiteStatus = 'Marketing site under construction';
export const softwareFactory: WorkSnapshot = {
  id: 'software-factory',
  kind: 'business',
  title: 'Software Factory',
  href: '/projects/software-factory/',
  visual: {
    kind: 'planned',
    status: factorySiteStatus,
  },
  description:
    'My independent project to help businesses define and own their software, with design decisions documented for the next engineer',
  stack: ['TypeScript', 'React', 'NestJS', 'Fastify', 'PostgreSQL', 'Kysely', 'Go', 'gRPC'],
  ai: [
    {
      kind: 'Product feature',
      tools: ['Sign in with ChatGPT'],
      note: 'Owen helps define the change. Iris edits and tests an isolated draft for human review.',
    },
    {
      kind: 'Developer tooling',
      tools: ['Codex'],
      note: 'I package the repository’s engineering skills for Codex.',
    },
  ],
};

export const currentWork: readonly WorkSnapshot[] = [
  softwareFactory,
  {
    id: 'pgim-platform',
    kind: 'career',
    title: 'PInnacle',
    visual: {
      kind: 'illustration',
      alt: 'Three blue architectural layers rising from one shared foundation.',
      caption: 'PGIM · illustration of a shared platform',
    },
    description:
      'PGIM’s internal app platform, where I led the move from Angular to React and wrote Storybook examples for teams',
    stack: [
      'React',
      'TypeScript',
      'Angular',
      'Nx',
      'C#',
      'SQL',
      'Storybook',
      'Docusaurus',
      'Kerberos',
    ],
  },
  {
    id: 'design-system',
    kind: 'career',
    title: 'DX design system',
    visual: {
      kind: 'illustration',
      alt: 'An abstract collection of color swatches, a focus ring, and a toggle.',
      caption: 'Prudential · design-system illustration',
    },
    description:
      'Accessible React components I build for Prudential’s design system, with examples that show teams how to use them',
    stack: ['React', 'TypeScript', 'GitHub Actions'],
    ai: [
      {
        kind: 'Developer tooling',
        tools: ['Claude Code'],
        note: 'I write plugins and skills to help AI-assisted changes follow the same conventions as the rest of the library.',
      },
    ],
  },
  {
    id: 'peaq',
    kind: 'career',
    title: 'PEAQ',
    description:
      'My current project at Prudential Retirement Strategies, where I standardized how the structured settlements app loads data for brokers',
    stack: ['React', 'TypeScript'],
    visual: {
      kind: 'illustration',
      alt: 'Parallel paper ribbons woven into an orderly pattern.',
      caption: 'Prudential Retirement Strategies · illustration',
    },
  },
  {
    id: 'market-data',
    kind: 'career',
    title: 'Market data dashboard',
    visual: {
      kind: 'capture',
      alt: 'A performance chart comparing the price histories of three sample instruments.',
      caption: 'Pharo assessment · sample market data',
      detail: [704, 535],
      wide: [1440, 900],
    },
    description:
      'React charts for comparing price histories and a C# statistics API, both built for the Pharo assessment',
    stack: [
      'React',
      'TypeScript',
      'TanStack Router',
      'TanStack Query',
      'D3',
      'ASP.NET Core',
      'C#',
      'xUnit',
    ],
    ai: [
      {
        kind: 'Development assistant',
        tools: ['Codex'],
        note: 'I used Codex for implementation, tests, review, and documentation. The dashboard itself doesn’t call a model.',
      },
    ],
  },
  {
    id: 'order-entry',
    kind: 'career',
    title: 'Order entry dashboard',
    visual: {
      kind: 'capture',
      alt: 'The order-entry dashboard showing sample trading activity.',
      caption: 'Schonfeld assessment · local demo orders',
      detail: [856, 451],
      wide: [1440, 1024],
    },
    description:
      'An order form I built for the Schonfeld assessment, with instant price feedback, server-side checks, and SQLite storage',
    stack: [
      'React',
      'TanStack Router',
      'TanStack Query',
      'React Hook Form',
      'Zod',
      'Express',
      'Prisma',
      'SQLite',
    ],
  },
  {
    id: 'anniversary',
    kind: 'personal',
    title: 'Girlfriend Birthday Gift',
    visual: {
      kind: 'capture',
      alt: 'A pink 3D gift box tied with a burgundy bow, surrounded by flowers and floating hearts.',
      caption: 'Personal project · 3D opening scene',
      detail: [786, 475],
      wide: [860, 484],
    },
    description:
      'A 3D gift box my girlfriend can open in her browser to see an animated story of our memories',
    stack: [
      'React',
      'Vite',
      'TanStack Router',
      'Three.js',
      'React Three Fiber',
      'Drei',
      'Motion',
      'Sharp',
    ],
  },
  {
    id: 'portfolio',
    kind: 'personal',
    title: 'This portfolio',
    visual: {
      kind: 'capture',
      alt: 'My blue portfolio homepage with its handwritten EV monogram and personal introduction.',
      caption: 'Personal project · this site',
      detail: [567, 301],
      wide: [1980, 1124],
    },
    description:
      'My writing, experiments, and work history on a static site with a reduced-motion version of my handwritten introduction',
    stack: ['Next.js', 'React Aria Components', 'Tailwind CSS', 'Nx', 'Playwright', 'Netlify'],
    ai: [
      {
        kind: 'Development assistant',
        tools: ['Codex'],
        note: 'I use Codex to help implement and test the site. Reading a page doesn’t trigger an AI request.',
      },
    ],
  },
];
