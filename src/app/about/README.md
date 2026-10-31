# src/app/about

## Overview
The `src/app/about` component package provides the biographical route (`/about`) for the portfolio application. It details professional background, architectural leadership milestones, industry certifications, and links to selected case studies and contact channels.

## Interface
- `[page.tsx:metadata]`: Next.js `Metadata` configuration object defining route title, description, canonical link, OpenGraph profile, and Twitter card tags.
- `[page.tsx:default]`: `AboutPage()` - React Server Component rendering executive biography, career timeline links, and outbound profile links.

## Invariants
- `[page.tsx:AboutPage]`: Component is a pure server-rendered route with no dynamic query parameters or mutable state.

## Side Effects
- `None`

## Verification
- Run: `npm test`
