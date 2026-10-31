# src/app/work/[slug]

## Overview
The `src/app/work/[slug]` component package delivers deep-dive architectural case study pages (`/work/[slug]`). It generates dynamic metadata, Schema.org JSON-LD breadcrumbs, edge-rendered OpenGraph share cards, and interactive case study visualizer interfaces.

## Interface
- `[loading.tsx:default]`: `Loading()` - Fallback loading skeleton with progress indicator animations.
- `[opengraph-image.tsx:runtime]`: Edge runtime declaration (`'edge'`).
- `[opengraph-image.tsx:alt]`: Default alt text for social card previews (`'Project Case Study'`).
- `[opengraph-image.tsx:size]`: Social card dimensions (`{ width: 1200, height: 630 }`).
- `[opengraph-image.tsx:contentType]`: Image MIME type (`'image/png'`).
- `[opengraph-image.tsx:default]`: `Image({ params }: { params: Promise<{ slug: string }> })` - Dynamic OpenGraph image generator utilizing `ImageResponse`.
- `[page.tsx:generateStaticParams]`: Static route generator enumerating slugs from `projects`.
- `[page.tsx:generateMetadata]`: Dynamic metadata generator producing case-study-specific OpenGraph, Twitter, and canonical metadata tags.
- `[page.tsx:default]`: `ProjectPage({ params }: { params: Promise<{ slug: string }> })` - Async Server Component injecting Schema.org BreadcrumbList structured data and rendering `ProjectCaseStudyClient`.

## Invariants
- `[page.tsx:notFound]`: Invokes Next.js `notFound()` when the requested `slug` does not exist in `projects`.
- `[opengraph-image.tsx:Image]`: Returns a styled "Project Not Found" image card if `slug` is invalid.
- `[page.tsx:breadcrumbJsonLd]`: Escapes `<` and `>` characters with `\u003c` and `\u003e` in serialized JSON-LD payloads to prevent HTML script breakout.

## Side Effects
- `[page.tsx:notFound]`: Throws Next.js not-found error to activate the nearest 404 boundary.

## Verification
- Run: `npm test`
