import type { ToolName } from '@/content/tools/marks';
import type { Messages } from '@/i18n/types';

/** A toolkit group, named in each language's `home.toolkit.groups` catalog. */
export type ToolGroupId = keyof Messages['home']['toolkit']['groups'];

export const toolkit = [
  {
    id: 'webMobile',
    tools: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vite', 'React Native', 'Angular'],
  },
  {
    id: 'dataState',
    tools: [
      'TanStack Router',
      'TanStack Query',
      'Redux',
      'Axios',
      'React Hook Form',
      'Zod',
      'TanStack Router & Query Devtools',
    ],
  },
  {
    id: 'designSystems',
    tools: [
      'React Aria Components',
      'Tailwind CSS',
      'Storybook',
      'i18next',
      'HTML',
      'CSS',
      'Styled Components',
    ],
  },
  {
    id: 'chartsMotion',
    tools: ['D3', 'SVG', 'Three.js', 'React Three Fiber', 'Drei', 'Motion', 'Web Animations API'],
  },
  {
    id: 'apisStorage',
    tools: [
      'C#',
      'ASP.NET Core',
      'Node.js',
      'NestJS',
      'Fastify',
      'Express',
      'OpenAPI / Swagger',
      'REST APIs',
      'SQL',
      'PostgreSQL',
      'Kysely',
      'SQLite',
      'Prisma',
    ],
  },
  {
    id: 'testing',
    tools: [
      'Vitest',
      'Testing Library',
      'Mock Service Worker (MSW)',
      'Playwright',
      'axe-core',
      'Cypress',
      'Jest',
      'Supertest',
      'xUnit',
    ],
  },
  {
    id: 'delivery',
    tools: [
      'Nx',
      'pnpm',
      'npm workspaces',
      'ESLint',
      'Prettier',
      'Sharp',
      'Changesets',
      'Docusaurus',
      'Artifactory',
      'Git',
      'Jenkins',
      'GitHub Actions',
      'Netlify',
    ],
  },
  {
    id: 'infrastructure',
    tools: ['Go', 'gRPC', 'Linux', 'Docker', 'OpenTofu', 'AWS', 'AWS SDK for JavaScript'],
  },
  {
    id: 'aws',
    tools: ['Fargate', 'CodeBuild', 'Step Functions'],
  },
  {
    id: 'identityPayments',
    tools: ['WorkOS AuthKit', 'OAuth', 'Kerberos', 'Stripe', 'Sign in with ChatGPT'],
  },
  {
    id: 'languages',
    tools: ['Python', 'Java', 'C++'],
  },
] as const satisfies readonly { id: ToolGroupId; tools: readonly ToolName[] }[];

export const featuredTools = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'TanStack Query',
  'Redux',
  'React Aria Components',
  'NestJS',
  'Fastify',
  'Kysely',
  'PostgreSQL',
  'ASP.NET Core',
  'GitHub Actions',
  'Playwright',
] as const satisfies readonly ToolName[];

export const aiTools = ['Claude Code', 'Codex'] as const satisfies readonly ToolName[];
