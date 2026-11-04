import type { ToolName } from '@/content/tools/marks';

export interface WorkSnapshot {
  id: string;
  title: string;
  description: string;
  href?: string;
  visual: { kind: 'capture' | 'illustration'; alt: string; caption: string };
  stack: readonly ToolName[];
  ai?: readonly { kind: string; tools: readonly ToolName[]; note: string }[];
}

/** Public summaries only; an assistant used in development is not a shipped product feature. */
export const softwareFactory: WorkSnapshot = {
  id: 'software-factory',
  title: 'Software Factory',
  href: '/projects/software-factory/',
  visual: {
    kind: 'capture',
    alt: 'The Factory Console planning workspace with owner and developer views and blank planning fields.',
    caption: 'Factory Console · local test workspace',
  },
  description:
    'My independent project grew out of supporting other engineers. I want a business to be able to explain what it needs, understand the tradeoffs, and own the result. A new engineer should be able to pick up the software and see why it works the way it does.',
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
    title: 'PInnacle',
    visual: {
      kind: 'illustration',
      alt: 'Three blue architectural layers rising from one shared foundation.',
      caption: 'PGIM · illustration of a shared platform',
    },
    description:
      'PGIM’s departmental application platform. I led the move from Angular to React and helped teams ship .NET and SQL apps from a shared foundation. One command set up a project; Storybook and onboarding guides helped the next engineer take it from there.',
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
    title: 'DX design system',
    visual: {
      kind: 'illustration',
      alt: 'An abstract collection of color swatches, a focus ring, and a toggle.',
      caption: 'Prudential · design-system illustration',
    },
    description:
      'My design-system work at Prudential. I help make accessible React and TypeScript components predictable both for someone using a keyboard and for the engineer putting the screen together.',
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
    title: 'PEAQ',
    description:
      'An internal Prudential broker application for structured settlements and Income Advantage. I refactored how its screens were organized and how they loaded data, so the next change wouldn’t require learning a new pattern on every screen.',
    stack: ['React', 'TypeScript'],
    visual: {
      kind: 'illustration',
      alt: 'Parallel paper ribbons woven into an orderly pattern.',
      caption: 'Prudential · refactor illustration',
    },
  },
  {
    id: 'market-data',
    title: 'Market data dashboard',
    visual: {
      kind: 'capture',
      alt: 'A performance chart comparing the price histories of three sample instruments.',
      caption: 'Pharo assessment · sample market data',
    },
    description:
      'A chart can make two instruments look similar even when their histories differ. For this assessment I built the React comparisons and the C# API that calculates the statistics behind them.',
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
    title: 'Order entry dashboard',
    visual: {
      kind: 'capture',
      alt: 'The order-entry dashboard showing sample trading activity.',
      caption: 'Schonfeld assessment · local demo orders',
    },
    description:
      'An order form needs fast price feedback, but the server still has to decide what it can accept. I built both sides for this assessment, down to the database that keeps the order.',
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
    title: 'YniBirthday',
    visual: {
      kind: 'capture',
      alt: 'Pink gift artwork from the anniversary site’s opening sequence.',
      caption: 'Personal project · opening artwork',
    },
    description:
      'An anniversary gift I built for my girlfriend: a 3D opening and an animated story told through our memories. Behind it are the same feature folders, shared UI, and code checks I use for work much less romantic than this.',
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
    title: 'This portfolio',
    visual: {
      kind: 'capture',
      alt: 'My blue portfolio homepage with its handwritten EV monogram and personal introduction.',
      caption: 'Personal project · this site',
    },
    description:
      'My writing, experiments, and work history in one place. This time I chose Next.js for static pages, but kept the same rules: shared controls, accessible interactions, and browser checks. Even the handwritten introduction works with motion turned off.',
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
