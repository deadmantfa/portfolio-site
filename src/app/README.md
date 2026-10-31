# src/app

## Overview
The `src/app` component package constitutes the Next.js App Router root for the portfolio application. It defines global layout structures, font configurations, root SEO and social metadata, error and 404 boundaries, search engine indexing routes, and the primary homepage experience.

## Interface
- `[layout.tsx:viewport]`: Next.js `Viewport` configuration setting theme color `#000000` and responsive scale constraints.
- `[layout.tsx:metadata]`: Root `Metadata` defining default title templates, OpenGraph tags, Twitter cards, and search crawler rules.
- `[layout.tsx:default]`: `RootLayout({ children })` - Root layout component injecting Google fonts and mounting layout providers (`StructuredData`, `ScrollProvider`, `Navigation`, `ArchitecturalScroll`, `AskWenceslaus`).
- `[page.tsx:default]`: `Home()` - Client-side homepage component orchestrating scroll progress metrics and staged 3D materialization.
- `[error.tsx:default]`: `Error({ error, reset })` - Next.js client error boundary component offering state reset recovery and return navigation.
- `[not-found.tsx:default]`: `NotFound()` - Fallback 404 component rendering recovery links to `/`.
- `[icon.tsx:runtime]`, `[icon.tsx:size]`, `[icon.tsx:contentType]`, `[icon.tsx:default]`: Node.js runtime favicon generator returning a 64x64 PNG via `ImageResponse`.
- `[opengraph-image.tsx:runtime]`, `[opengraph-image.tsx:size]`, `[opengraph-image.tsx:contentType]`, `[opengraph-image.tsx:default]`: Edge runtime OpenGraph banner generator returning a 1200x630 PNG via `ImageResponse`.
- `[robots.ts:default]`: `robots()` - Returns `MetadataRoute.Robots` directing crawlers to `/` and the sitemap.
- `[sitemap.ts:default]`: `sitemap()` - Returns `MetadataRoute.Sitemap` generating URL mappings for static pages and dynamic work routes.
- Subdirectories:
  - about: [./about/README.md](./about/README.md) - Professional biography, leadership background, and career timeline.
  - actions: [./actions/README.md](./actions/README.md) - Server Actions for contact form validation and Resend email transmission.
  - api: [./api/README.md](./api/README.md) - Root API routing container housing conversational chat endpoint.
  - contact: [./contact/README.md](./contact/README.md) - Advisory engagement details, contact form, and direct networking links.
  - for: [./for/README.md](./for/README.md) - Container for company-personalized presentation overlays.
  - privacy: [./privacy/README.md](./privacy/README.md) - Site privacy disclosures, third-party services, and user rights.
  - work: [./work/README.md](./work/README.md) - Portfolio case study presentation hierarchy.

## Invariants
- `[page.tsx:Home]`: Guarded by `sequenceStarted.current` to prevent duplicate execution of the entrance animation sequence (`idle` -> `spark` -> `cloud` -> `scan` -> `complete`).
- `[error.tsx:Error]`: Enforces client boundary (`'use client'`) to receive error digests and dispatch `reset()`.
- `[layout.tsx:RootLayout]`: Requires all child routes to be wrapped inside `ScrollProvider` context for synchronized scroll state.
- `[sitemap.ts:sitemap]`: Dynamically projects every project entry in `projects` into the sitemap under `/work/${project.slug}`.

## Side Effects
- `[error.tsx:console.error]`: Logs caught runtime exceptions to console on error boundary trigger.
- `[page.tsx:useEffect]`: Dispatches asynchronous timers via `setTimeout` to cycle materialization stages.

## Verification
- Run: `npm test`
