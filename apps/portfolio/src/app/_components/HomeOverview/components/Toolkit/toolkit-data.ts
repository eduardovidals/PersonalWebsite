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
    tools: ['React Aria Components', 'Tailwind CSS', 'Storybook', 'i18next', 'HTML', 'CSS'],
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
    title: 'Identity, payments & AI',
    tools: ['WorkOS AuthKit', 'OAuth', 'Stripe', 'Sign in with ChatGPT', 'Codex', 'Claude Code'],
  },
  {
    title: 'Other languages',
    tools: ['Python', 'Java', 'C++'],
  },
] as const;

type Tool = (typeof toolkit)[number]['tools'][number];

export const featuredTools = [
  ['React', 'react', 'text-cyan-300'],
  ['TypeScript', 'typescript', 'text-blue-400'],
  ['Next.js', 'nextdotjs', 'text-vidals-text'],
  ['Tailwind CSS', 'tailwindcss', 'text-sky-300'],
  ['TanStack Query', 'reactquery', 'text-rose-400'],
  ['TanStack Router', 'route', 'text-emerald-300'],
  ['Redux', 'redux', 'text-violet-300'],
  ['React Aria Components', 'accessibility', 'text-vidals-highlight'],
  ['Storybook', 'storybook', 'text-pink-400'],
  ['Vite', 'vite', 'text-amber-300'],
  ['Nx', 'nx', 'text-sky-200'],
  ['Playwright', 'browser-check', 'text-green-300'],
] as const satisfies ReadonlyArray<readonly [Tool, string, string]>;
