# Implementation Plan: Global SEO & Performance Optimization

## Phase 1: Structured Data & Discovery
- [x] Task: JSON-LD Implementation (a860253)
    - [x] Create a `StructuredData` component for Person and Professional profile schema.
    - [x] Integrate into `src/app/layout.tsx`.
- [ ] Task: Automated Sitemap Generation
    - [ ] Implement `src/app/sitemap.ts` to dynamically include all case studies.
    - [ ] Create `src/app/robots.txt`.

## Phase 2: Performance & Asset Tuning
- [ ] Task: Font & Image Optimization
    - [ ] Audit font loading strategy to prevent layout shift.
    - [ ] Ensure all SVGs and images use modern Next.js optimization patterns.
- [ ] Task: Three.js Loading States
    - [ ] Implement a high-end, minimal "Architectural Loader" for the 3D canvas initialization.

## Phase 3: Accessibility & Final Audit
- [ ] Task: WCAG Compliance Pass
    - [ ] Audit all interactive elements for focus rings and ARIA labels.
    - [ ] Final contrast check on all editorial sections.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Production Readiness Review'
