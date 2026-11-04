# Eduardo Vidals — portfolio & field notes

Source for [www.eduardovidals.com](https://www.eduardovidals.com). The home page includes an interactive breadth-first search; the project archive preserves the six original case-study URLs. Field notes have permanent URLs and an RSS feed.

## Run and check

Use the Node version in `.nvmrc`. From the repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js. To verify production output, install Chromium for Playwright once (`npx playwright install chromium`), then run:

```sh
npm run check
npm run preview
```

If Google Chrome is already installed, `PLAYWRIGHT_CHANNEL=chrome npm run check` uses it instead. The preview serves the static export on `http://127.0.0.1:4173`. Tests own ports 4173 and 4183; stop any manual preview before running them. They inspect exported HTML, old project URLs, keyboard and mobile behavior, accessibility and RSS. A separate local dev fixture exercises configured contact delivery with intercepted requests, never real email.

## Write a post

Add a Markdown file to `src/content/blog/`. Its filename (lowercase words separated by hyphens) is its permanent URL. The homepage, blog index, feed and sitemap discover it at build time. Use the actual publication date; archive adaptations may include an HTTPS `sourceUrl`.

```markdown
---
title: 'A title for the post'
summary: 'What this note helps the reader understand.'
date: '2026-11-04'
category: 'Engineering'
---

The body starts here. The page already renders the title; use second-level headings for sections.
```

To update a case study, edit its Markdown in `src/content/projects/`; its title, summary, stack and cover live in that directory’s `index.ts`. Locally hosted screenshots and recordings live in `public/work/`. Preserve the published slugs, original attribution and useful code examples.

## Netlify and contact

Keep the existing Netlify project, domain and Git connection. `netlify.toml` builds with `npm run build` and publishes `out/`. This is a static export: no request-time Next server, database, remote fonts or SPA catch-all rewrite. The production domain’s existing redirect ends at `www.eduardovidals.com`; canonical URLs, sitemap and RSS use that host. Netlify preview builds discourage indexing.

The contact form accepts the existing **public browser settings** `REACT_APP_SERVICE_ID`, `REACT_APP_TEMPLATE_ID` and `REACT_APP_PUBLIC_KEY` from Netlify at build time. No secret mail credential is needed. If any setting is absent, the site offers a direct email link. A rejected submission retains the visitor’s draft. Rebuild after changing configuration.
