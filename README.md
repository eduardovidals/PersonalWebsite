# Eduardo Vidals Portfolio

[www.eduardovidals.com](https://www.eduardovidals.com) is my portfolio, in English, Spanish, Arabic, and Vietnamese. The homepage introduces my work at Prudential, my company Velton, my career, and my toolkit. Every project has its own write-up, the way my original site worked, so there is no separate blog. `/projects/software-factory/` tells the Velton founder story, and `/about/` is the longer career story.

## Run Locally

Use Node from `.nvmrc` and npm 12.2.1. Install once from the workspace root:

```sh
npm ci
npm run dev
```

ESLint stays on 9 while the import, React, and JSX accessibility plugins in Next’s lint preset require it. TypeScript stays on 6.0 while the preset’s TypeScript parser requires `<6.1`. Recheck those peer ranges before upgrading either major; do not force the install or disable lint rules.

## Workspace

| Owner                                                              | Responsibility                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/portfolio`                                                   | Next.js App Router, static pages in four languages, Markdown stories, media, keyboard and browser scenarios                                                                                                                                     |
| `packages/vidals-react-components`                                 | React Aria components with typed exports, unit tests and Storybook stories: links, buttons, icon buttons, disclosures, text fields, the phone and language menus, back to top, link labels, the press ripple, and Vietnamese React Aria strings |
| `packages/vidals-tailwind-theme`                                   | Tailwind v4 theme: Vidals colors, fonts and type tokens (including Arabic and Vietnamese), React Aria state variants, focus styles, and the ripple, link, and menu motion                                                                       |
| `packages/vidals-eslint-config`, `packages/vidals-prettier-config` | Shared lint rules and formatting defaults                                                                                                                                                                                                       |

Nx builds the component package before its consumers. Next owns URLs and static rendering; there’s no second client router or client cache for local Markdown. The contact form uses React Hook Form and Zod with the same accessible fields used in Storybook.

Every link, button, menu, disclosure, and form control is a React Aria component; there are no `next/link`, native anchors, buttons, or `<details>` elements in the app. One client `LinkRouter` in the root layout gives React Aria a `RouterProvider` that sends same-site paths through Next’s router, so pages change without a full reload. A link to the current page scrolls to its top, and a link to a section on the same page uses the browser’s own jump. React Aria renders real `<a href>` elements, so links still work before JavaScript loads.

Routes in `apps/portfolio/src/app/` stay thin: metadata, static parameters, and reading a story from disk. Each page’s UI lives in `apps/portfolio/src/features/`, mirroring the routes (`Home`, `Projects`, `Projects/Project`, `Projects/Velton`, `About`), with private children under each owner’s `components/`. Shared UI such as the header, footer, tool chips, and artwork lives in `apps/portfolio/src/components/`. Components follow one shape: a folder with `Name.tsx`, `types.ts` for public props, `styles.ts` for complete Tailwind class literals, and `index.ts`.

- `npm run storybook`: develop the reusable controls independently.
- `npm run storybook:build`: build their static catalog.
- `npm run check`: lint (including formatting), typecheck, component tests, story interaction/accessibility tests, production export and portfolio browser tests. GitHub Actions runs it on every pull request and on `main` (`.github/workflows/ci.yml`), and Netlify builds a deploy preview for each pull request.
- `npm run build && npm run preview`: serve the static portfolio at `http://127.0.0.1:4173`.

Browser checks run in Chromium (Chrome, Edge) and WebKit (Safari). Install the engines with `npx playwright install chromium webkit`. Set `PLAYWRIGHT_BROWSERS` to narrow the list, such as `PLAYWRIGHT_BROWSERS=chromium npm run check`. Firefox is left out because Playwright’s patched Firefox build crashes and fails to launch on macOS 27 for reasons unrelated to the site. Safari on macOS moves between links with Option+Tab, so keyboard tests press it in WebKit on a Mac. Tests use loopback ports 4173 and 4183. Close any manual preview on those ports first. Contact tests intercept delivery; they never send email.

## Languages

English keeps the original URLs. Spanish, Arabic, and Vietnamese live under `/es/`, `/ar/`, and `/vi/`, through a `[locale]` route tree beside the `(en)` group. Each tree has its own root layout, so every static page ships with the right `<html lang>` and `dir`, and Arabic renders right to left. `global-not-found.tsx` owns the 404 page because there are two root layouts. Every page lists its translations as `hreflang` alternates, and the sitemap includes every language. The language menu in the header opens the same page in another language.

The bare homepage opens in the visitor’s language. A Netlify edge function, `apps/portfolio/netlify/edge-functions/language.ts`, checks in order: a language chosen in the header menu, kept for a year in a `language` cookie; a translated language the visitor’s system prefers over English; then their country, so Vietnam opens Vietnamese, Spanish-speaking countries open Spanish, and Arabic-speaking countries open Arabic. Everyone else stays on English. Shared links to other pages keep the language they were shared in, and search engines get English as the `x-default` page. The redirect runs only on Netlify, so a local preview always opens English at `/`.

Browsers send their own language list, which Chrome keeps from install time even after the system language changes. So the English homepage also runs `SystemLanguage`, a tiny inline script ahead of everything else in the body: when no language was chosen in the menu, it opens a translated language the browser ranks above English or, failing that, the system language that `Intl` reports. It runs locally too.

`apps/portfolio/src/i18n/` owns the typed locale registry, one lazily loaded catalog per language, and the build-time translator. Catalog values are read as typed properties; i18next formats the few strings with counts or names, using each language’s plural rules (Arabic has six). Dates use `Intl`. Long-form stories are Markdown in `apps/portfolio/src/content/stories/<language>/`. React Aria’s `I18nProvider` gets the page’s language, and Vietnamese pages inject Vietnamese screen-reader strings, which React Aria does not ship.

To change copy, edit the English catalog in `apps/portfolio/src/i18n/messages/en/` or the English story, then update the other three languages. TypeScript requires every language to match the English catalog’s shape.

## Site Behavior

The header stays pinned while you scroll. On phones, the menu button's three bars morph into an X, and the menu opens as a React Aria modal pinned under the header, so it lines up at any scroll position. In-page links scroll smoothly and stop below the sticky header and section tabs. A back-to-top button appears after about one and a half screens. Buttons, cards, and tabs show a press ripple. Reduced motion turns every animation into an instant change.

The site uses Velton's type system: Manrope for headings, Instrument Sans for reading, and JetBrains Mono for small labels. Arabic pages use Noto Sans Arabic and Noto Kufi Arabic, and Vietnamese pages use Be Vietnam Pro, because Instrument Sans has no Vietnamese letters. The handwritten EV starts in the center of the visible screen on phones and tablets, or in the hero on desktop, then settles into the top-left home link. It plays on every fresh visit to a homepage, however slowly scripts load: a tiny inline script holds the hero back from the first paint, so copy never appears and then vanishes, and if scripts never arrive the hero fades in after four seconds. Once it starts it plays to the end through taps, clicks, scrolling, resizing and links to a section; the hidden hero ignores taps until its copy is visible again. Pressing Tab settles it at once, so keyboard focus never lands on hidden copy. With reduced motion or JavaScript disabled, the home link and introduction are already in place.

## Writing Style

- In English, use Title Case for headings, project and job titles, labels, categories, and captions. Spanish, Arabic, and Vietnamese follow their own capitalization.
- Write subtitles, descriptions, intros, and captions as one line without a final period. Only article paragraphs end in periods.
- Do not use em dashes or dot separators in visible text. Use a comma, or a pipe in page titles.
- Name the destination in every link, such as "All 13 projects" or "Why I founded Velton". Never write "Learn more" or start several links with the same verb.
- Describe Prudential work as design systems and products that scale. Never name internal projects, and keep Velton's story independent of current or past employers.

## Projects

Each project's slug, stack, and media live in `apps/portfolio/src/content/projects/`; their titles, captions, and descriptions live in each language's `projects` catalog. Case studies, the Velton story, and the About story are Markdown in `apps/portfolio/src/content/stories/<language>/`. Tool names stay in English and resolve to labeled chips through `apps/portfolio/src/content/tools/marks.ts` and the local SVG sprite. Attribute AI by its actual role: a user-facing feature, developer tooling, or assistance during development. Preserve project slugs, since older versions of the site link to them.

Screenshots and videos live in `apps/portfolio/public/work/`. The Velton capture comes from the local Velton marketing site, and the portfolio capture shows the current homepage. Yni Anniversary shows the gift box from its opening scene without exposing personal memories. PInnacle shows the PGIM logo and the Prudential Design System shows the public prudential.com homepage, never internal screens. Old `/blog/` addresses redirect to the matching project pages through `netlify.toml`.

## Netlify and Contact

The existing Netlify site builds from the repository root with `npm run build` and publishes `apps/portfolio/out/`. There is no production Next server or catch-all rewrite. Production canonical URLs use `www.eduardovidals.com`; previews discourage indexing.

The contact form reuses the existing public EmailJS build settings: `REACT_APP_SERVICE_ID`, `REACT_APP_TEMPLATE_ID` and `REACT_APP_PUBLIC_KEY`. A direct email link remains available without these settings or JavaScript. No mail-service secret belongs in this site.
