# rko-design

Personal site/portfolio built with React, TanStack Router, and Vite.

## Prerequisites

- Node.js 20+ (project is built on Netlify with Node 20)
- npm (a `package-lock.json` is committed, so stick with npm rather than pnpm/yarn)

## Getting started

```bash
npm install
npm run dev
```

This starts the Vite dev server (printed URL, typically `http://localhost:5173`) with hot reload.

## Other scripts

```bash
npm run build      # type-check (tsc) and build for production into dist/
npm run preview    # serve the production build locally
npm run typecheck  # run TypeScript without emitting output
npm run test       # run the vitest suite (jsdom, includes axe on every route)
npm run audit:a11y # axe in real Chrome on every route at 1280×800 and 390×844, color-contrast on
```

`audit:a11y` builds and previews the site itself and needs Google Chrome installed. Set `BASE=https://…` to audit a deployed site instead. It isn't part of the pre-commit gate; run it before a release or after visual changes. Contrast that axe can't decide (text over gradients, images or pseudo-elements) is listed as "incomplete" and needs a manual check.

## Deployment

The site deploys to Netlify. `netlify.toml` runs `npm run build` and publishes the `dist` folder, with all routes rewritten to `index.html` for client-side routing.

## Project structure

- `src/routes` — TanStack Router file-based routes (`routeTree.gen.ts` is auto-generated, don't edit by hand)
- `src/components` — shared React components
- `src/assets` — static assets imported by components
- `public` — static files served as-is
