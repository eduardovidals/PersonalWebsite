export const toolkit = [
  {
    title: 'Web & mobile',
    description:
      'This portfolio uses the Next.js App Router. For a standalone React app, I usually start with Vite. I used React Native for the Props mobile app.',
    tools: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vite', 'React Native', 'Angular'],
  },
  {
    title: 'Routing, data & state',
    description:
      'In my dashboards, TanStack Router owns the URL and TanStack Query caches server data. On Benev, I used Redux for shared client state.',
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
    description:
      'I build keyboard-accessible controls with React Aria, style them with Tailwind, and keep their states and interactions visible in Storybook.',
    tools: ['React Aria Components', 'Tailwind CSS', 'Storybook', 'i18next', 'HTML', 'CSS'],
  },
  {
    title: 'Charts, 3D & motion',
    description:
      'I use D3 scales and SVG paths for time-series charts, and React Three Fiber when I want a scene you can move through.',
    tools: ['D3', 'SVG', 'Three.js', 'React Three Fiber', 'Drei', 'Motion', 'Web Animations API'],
  },
  {
    title: 'APIs & storage',
    description:
      'My market-data API is written in C#. For transactional systems I also work in TypeScript, from the HTTP contract down to the database migration.',
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
    description:
      'I test a component through its accessible controls, then use a browser for the workflows where keyboard, focus, and real rendering matter.',
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
    description:
      'I maintain shared packages, document how to adopt them, and automate their checks and releases. Netlify serves this site.',
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
    description:
      'I built a Go runner for Software Factory and test it locally. The AWS adapters cover jobs in Fargate, builds in CodeBuild, and workflows in Step Functions.',
    tools: ['Go', 'gRPC', 'Linux', 'Docker', 'OpenTofu', 'AWS SDK for JavaScript'],
  },
  {
    title: 'Identity, payments & AI',
    description:
      'I’ve integrated sign-in and payments, and built tools around coding agents so a developer can inspect, test, and approve their changes.',
    tools: ['WorkOS AuthKit', 'OAuth', 'Stripe', 'Sign in with ChatGPT', 'Codex', 'Claude Code'],
  },
  {
    title: 'Other languages',
    description: 'Alongside TypeScript, C#, and Go, my programming background includes:',
    tools: ['Python', 'Java', 'C++'],
  },
] as const;
