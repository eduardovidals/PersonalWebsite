import type { ToolName } from '@/content/tools/marks';

export const toolkit = [
  {
    title: 'Web & mobile',
    tools: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vite', 'React Native', 'Angular'],
  },
  {
    title: 'Routing, data & state',
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
    title: 'Design systems',
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
    title: 'Charts, 3D & motion',
    tools: ['D3', 'SVG', 'Three.js', 'React Three Fiber', 'Drei', 'Motion', 'Web Animations API'],
  },
  {
    title: 'APIs & storage',
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
    title: 'Testing & accessibility',
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
    title: 'Developer tools & delivery',
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
      'GitHub Actions',
      'Netlify',
    ],
  },
  {
    title: 'Runners & infrastructure',
    tools: ['Go', 'gRPC', 'Linux', 'Docker', 'OpenTofu', 'AWS SDK for JavaScript'],
  },
  {
    title: 'AWS adapters',
    tools: ['Fargate', 'CodeBuild', 'Step Functions'],
  },
  {
    title: 'Identity & payments',
    tools: ['WorkOS AuthKit', 'OAuth', 'Stripe'],
  },
  {
    title: 'Other languages',
    tools: ['Python', 'Java', 'C++'],
  },
] as const satisfies readonly { title: string; tools: readonly ToolName[] }[];

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

export const aiTools = [
  'Claude Code',
  'Codex',
  'Sign in with ChatGPT',
] as const satisfies readonly ToolName[];
