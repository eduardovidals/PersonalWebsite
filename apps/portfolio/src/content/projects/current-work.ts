import type { ToolName } from '@/content/tools/marks';

interface WorkSnapshot {
  id: string;
  title: string;
  description: string;
  stack: readonly ToolName[];
  ai?: readonly { kind: string; tools: readonly ToolName[]; note: string }[];
}

/** Public summaries only; an assistant used in development is not a shipped product feature. */
export const softwareFactory: WorkSnapshot = {
  id: 'software-factory',
  title: 'Software Factory',
  description:
    'I use NestJS with Fastify for the API and Kysely to query PostgreSQL. The database keeps the history of a change; a separate Go runner builds and tests it. I can try the result in a preview before approving a local release. I’m interested in the next change, too: when a dependency needs an update, what might break, and how would we know?',
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
    id: 'design-system',
    title: 'Design-system tooling',
    description:
      'Shared, accessible React components and the checks teams use when they change them.',
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
    id: 'market-data',
    title: 'Market data dashboard',
    description:
      'An engineering assessment: compare instruments on a chart while the C# API calculates the historical statistics.',
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
    description:
      'An engineering assessment pairing an order form and price lookup with an API that validates and stores orders.',
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
    title: 'Anniversary experience',
    description:
      'A personal gift built as an interactive story, with a 3D opening and animated transitions between memories.',
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
    description:
      'A statically exported portfolio and blog. The toolkit and case studies are readable without JavaScript.',
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
