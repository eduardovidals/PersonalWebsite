import type { ToolName } from '@/content/tools/marks';

interface WorkSnapshot {
  id: string;
  title: string;
  description: string;
  href?: string;
  stack: readonly ToolName[];
  ai?: readonly { kind: string; tools: readonly ToolName[]; note: string }[];
}

/** Public summaries only; an assistant used in development is not a shipped product feature. */
export const softwareFactory: WorkSnapshot = {
  id: 'software-factory',
  title: 'Software Factory',
  href: '/projects/software-factory/',
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
    title: 'PGIM application platform',
    description:
      'I led our department’s move from Angular to React and helped teams use the platform on real .NET and SQL apps. A single command set up a full-stack project; Storybook examples and onboarding guides helped engineers take it from there. The apps used the company’s existing Kerberos sign-in.',
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
    title: 'Design systems at Prudential',
    description:
      'My focus at Prudential Financial is the React and TypeScript design system. I care as much about how a control feels to someone using a keyboard as how easy it is for a developer to use it correctly.',
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
    title: 'Anniversary experience',
    description:
      'For our anniversary I wanted to give someone a website they could experience, not a gallery to scroll past. A 3D opening leads into an animated story made from our memories.',
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
      'My corner of the web for writing, experiments, and the work behind them. I kept my hand-drawn initials and typing effect, but neither has to run for you to read or navigate the site.',
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
