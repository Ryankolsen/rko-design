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
npm run test       # placeholder, no unit tests yet
```

## Deployment

The site deploys to Netlify. `netlify.toml` runs `npm run build` and publishes the `dist` folder, with all routes rewritten to `index.html` for client-side routing.

## Project structure

- `src/routes` — TanStack Router file-based routes (`routeTree.gen.ts` is auto-generated, don't edit by hand)
- `src/components` — shared React components
- `src/assets` — static assets imported by components
- `public` — static files served as-is
