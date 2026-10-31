# src/app/contact

## Overview
The `src/app/contact` component package provides the contact and advisory engagement page (`/contact`). It establishes executive positioning for fractional CTO and advisory roles, incorporating an interactive contact form and direct networking channels.

## Interface
- `[page.tsx:metadata]`: Next.js `Metadata` configuration object defining canonical URL, OpenGraph tags, and Twitter summary cards.
- `[page.tsx:default]`: `ContactPage()` - React Server Component that renders contact narratives, pull quotes, and embeds the interactive `ContactForm` and `SocialLinks` components.

## Invariants
- `[page.tsx:ContactPage]`: Renders statically as a server component without route parameters or server mutation logic.

## Side Effects
- `None`

## Verification
- Run: `npm test`
