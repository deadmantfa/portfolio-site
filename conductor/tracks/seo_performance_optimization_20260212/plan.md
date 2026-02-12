# Implementation Plan: Global SEO & Performance Optimization

## Phase 1: Structured Data & Discovery [checkpoint: 401719e]
- [x] Task: JSON-LD Implementation (a860253)
    - [x] Create a `StructuredData` component for Person and Professional profile schema.
    - [x] Integrate into `src/app/layout.tsx`.
- [x] Task: Automated Sitemap Generation (e2e5dc4)
    - [x] Implement `src/app/sitemap.ts` to dynamically include all case studies.
    - [x] Create `src/app/robots.txt`.

## Phase 2: Performance & Asset Tuning
- [x] Task: Font & Image Optimization (9587ead)
    - [x] Audit font loading strategy to prevent layout shift.
    - [x] Ensure all SVGs and images use modern Next.js optimization patterns.
- [x] Task: Three.js Loading States (338c903)
    - [x] Implement a high-end, minimal "Architectural Loader" for the 3D canvas initialization.

## Phase 3: Accessibility & Final Audit
- [ ] Task: WCAG Compliance Pass
    - [ ] Audit all interactive elements for focus rings and ARIA labels.
    - [ ] Final contrast check on all editorial sections.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Production Readiness Review'
