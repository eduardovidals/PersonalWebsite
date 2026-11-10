import type { ToolName } from '@/content/tools/marks';
import type { Messages } from '@/i18n/types';
import type { ProjectKind } from './kind';

/** A current-work entry's permanent ID, also its anchor on the projects page. */
export type WorkId = keyof Messages['projects']['work'];

/** How AI took part: a shipped feature, tooling for developers, or help during development. */
export type AiKind = keyof Messages['projects']['aiKinds'];

/** Structure and media for one piece of current work. Its words live in each language's catalog. */
export interface WorkSnapshot {
  id: WorkId;
  kind: ProjectKind;
  href?: string;
  visual:
    | { kind: 'capture'; detail: readonly [number, number]; wide: readonly [number, number] }
    | { kind: 'illustration' };
  stack: readonly ToolName[];
  ai?: readonly { kind: AiKind; tools: readonly ToolName[] }[];
}

/** Public summaries only; an assistant used in development is not a shipped product feature. */
export const softwareFactory: WorkSnapshot = {
  id: 'software-factory',
  kind: 'business',
  href: '/projects/software-factory/',
  visual: { kind: 'capture', detail: [1180, 580], wide: [1440, 780] },
  stack: ['TypeScript', 'React', 'NestJS', 'Fastify', 'PostgreSQL', 'Kysely', 'Go', 'gRPC'],
  ai: [
    { kind: 'productFeature', tools: ['Sign in with ChatGPT'] },
    { kind: 'developerTooling', tools: ['Claude Code', 'Codex'] },
  ],
};

export const currentWork: readonly WorkSnapshot[] = [
  softwareFactory,
  {
    id: 'pgim-platform',
    kind: 'career',
    visual: { kind: 'illustration' },
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
    visual: { kind: 'capture', detail: [1180, 580], wide: [1440, 780] },
    stack: ['React', 'TypeScript', 'GitHub Actions'],
    ai: [{ kind: 'developerTooling', tools: ['Claude Code'] }],
  },
  {
    id: 'market-data',
    kind: 'career',
    visual: { kind: 'capture', detail: [704, 535], wide: [1440, 900] },
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
    ai: [{ kind: 'developmentAssistant', tools: ['Codex'] }],
  },
  {
    id: 'order-entry',
    kind: 'career',
    visual: { kind: 'capture', detail: [856, 451], wide: [1440, 1024] },
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
    visual: { kind: 'capture', detail: [786, 475], wide: [860, 484] },
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
    visual: { kind: 'capture', detail: [567, 301], wide: [1980, 1124] },
    stack: ['Next.js', 'React Aria Components', 'Tailwind CSS', 'Nx', 'Playwright', 'Netlify'],
    ai: [{ kind: 'developmentAssistant', tools: ['Claude Code', 'Codex'] }],
  },
];
