# src/app/privacy

## Overview
The `src/app/privacy` component package provides the legal privacy policy page (`/privacy`) for the portfolio website. It discloses data collection practices, transactional email usage, cookie handling, third-party hosting terms, and user data subject rights.

## Interface
- `[page.tsx:metadata]`: Next.js `Metadata` configuration object defining canonical URL, OpenGraph metadata, and indexing directives (`robots: { index: true, follow: false }`).
- `[page.tsx:default]`: `PrivacyPage()` - React Server Component rendering privacy disclosures, third-party policies, and contact information for data deletion.

## Invariants
- `[page.tsx:PrivacyPage]`: Pure static server component with no runtime state or dynamic URL parameters.

## Side Effects
- `None`

## Verification
- Run: `npm test`
