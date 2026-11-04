# Eduardo Vidals — personal website

[www.eduardovidals.com](https://www.eduardovidals.com) is my portfolio and blog. The homepage gives the short version of my career; `/about/` tells how my design-system and full-stack work led to Software Factory. The [Factory project page](apps/portfolio/src/app/projects/software-factory/page.tsx) distinguishes the idea from what the local MVP demonstrates. The handwritten EV starts in the center of the visible screen on phones and tablets, or in the hero on desktop, then settles into the top-left home link. With reduced motion or JavaScript disabled, the home link and introduction are already in place. The separate role line can be paused and finishes on its own. Both sorting visualizers remain in the six-project archive.

## Run locally

Use Node from `.nvmrc` and npm 12.2.1. Install once from the workspace root:

```sh
npm ci
npm run dev
```

ESLint stays on 9 while the import, React, and JSX accessibility plugins in Next’s lint preset require it. TypeScript stays on 6.0 while the preset’s TypeScript parser requires `<6.1`. Recheck those peer ranges before upgrading either major; do not force the install or disable lint rules.

## Workspace

| Owner                                                              | Responsibility                                                                            |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `apps/portfolio`                                                   | Next.js App Router, static pages, Markdown content, media, keyboard and browser scenarios |
| `packages/vidals-react-components`                                 | React Aria buttons and labeled text fields; public typed exports, tests and Storybook     |
| `packages/vidals-tailwind-theme`                                   | Tailwind v4 shared theme, Vidals colors and React Aria interaction variants               |
| `packages/vidals-eslint-config`, `packages/vidals-prettier-config` | Shared lint rules and formatting defaults                                                 |

Nx builds the component package before its consumers. Next owns URLs and static rendering; there’s no second client router or client cache for local Markdown. The contact form uses React Hook Form and Zod with the same accessible fields used in Storybook. Navigation uses real links, so reading and navigation don’t depend on hydration.

- `npm run storybook`: develop the reusable controls independently.
- `npm run storybook:build`: build their static catalog.
- `npm run check`: lint (including formatting), typecheck, component tests, story interaction/accessibility tests, production export and portfolio browser tests.
- `npm run build && npm run preview`: serve the static portfolio at `http://127.0.0.1:4173`.

For browser checks, install Chromium with `npx playwright install chromium`, or use installed Chrome with `PLAYWRIGHT_CHANNEL=chrome npm run check`. Tests use loopback ports 4173 and 4183. Close any manual preview on those ports first. Contact tests intercept delivery; they never send email.

## Writing and projects

Add a Markdown file to `apps/portfolio/src/content/blog/`. Its lowercase hyphenated filename becomes its permanent URL. The homepage, blog index, RSS feed and sitemap discover it at build time. Use the actual publication date; an archive adaptation may include an HTTPS `sourceUrl`.

```markdown
---
title: 'A title for the post'
summary: 'What the reader will learn.'
date: '2026-11-04'
category: 'Engineering'
---

Start the post here. The page already supplies its title.
```

Case study Markdown, each project's stack, and recent work summaries live in `apps/portfolio/src/content/projects/`. Tool names resolve to labeled chips through `apps/portfolio/src/content/tools/marks.ts` and the local SVG sprite. Attribute AI by its actual role: a user-facing feature, developer tooling, or assistance during development. Local screenshots and videos live in `apps/portfolio/public/work/`. Preserve article slugs and attribution when editing.

## Netlify and contact

The existing Netlify site builds from the repository root with `npm run build` and publishes `apps/portfolio/out/`. There is no production Next server or catch-all rewrite. Production canonical URLs use `www.eduardovidals.com`; previews discourage indexing.

The contact form reuses the existing public EmailJS build settings: `REACT_APP_SERVICE_ID`, `REACT_APP_TEMPLATE_ID` and `REACT_APP_PUBLIC_KEY`. A direct email link remains available without these settings or JavaScript. No mail-service secret belongs in this site.
