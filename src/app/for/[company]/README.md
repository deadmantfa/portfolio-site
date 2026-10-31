# src/app/for/[company]

## Overview
The `src/app/for/[company]` component package provides personalized dynamic share landing routes (`/for/[company]`). It matches incoming company slugs against predefined candidate shares and renders a customized presentation overlay or redirects invalid requests.

## Interface
- `[page.tsx:generateStaticParams]`: Static route generator extracting available company keys from `Object.keys(shares)`.
- `[page.tsx:default]`: `ForCompanyPage({ params }: Props)` - Async React Server Component displaying tailored portfolio pitch overlays via `ShareOverlayWrapper`.

## Invariants
- `[page.tsx:ForCompanyPage]`: Normalizes `company` slug via `company.toLowerCase()` against the `shares` registry.
- `[page.tsx:redirect]`: Redirects requests to `'/'` immediately if `shares[company.toLowerCase()]` is undefined.

## Side Effects
- `[page.tsx:redirect]`: Triggers Next.js navigation redirect, halting render execution and returning a redirect response.

## Verification
- Run: `npm test`
