# Implementation Plan: Portfolio Comprehensive Audit (Analyze & Repair)

## Phase 1: Technical SEO & Metadata Remediation [checkpoint: ddf421f]
- [x] Task: Comprehensive SEO Audit & Reporting (e75ce1c)
    - [x] Run automated SEO audit and document findings in `conductor/audit_reports/seo_initial.md`.
- [x] Task: Metadata & Structured Data Fixes (e75ce1c)
    - [x] Write tests for missing or incorrect meta tags in `src/__tests__/seo_remediation.test.ts`.
    - [x] Correct `robots.ts`, `sitemap.ts`, and `StructuredData.tsx` to ensure 100/100 Lighthouse SEO.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Technical SEO & Metadata Remediation' (Protocol in workflow.md) [checkpoint: ddf421f]

## Phase 2: Design Consistency & A11y Polish
- [~] Task: Design Review & Accessibility Audit
    - [ ] Audit UI for OKLCH consistency and A11y (ARIA, keyboard nav).
    - [ ] Document findings in `conductor/audit_reports/design_a11y.md`.
- [ ] Task: UI/UX & Accessibility Implementation
    - [ ] Write tests for keyboard navigation and ARIA roles in `src/__tests__/a11y_polish.test.ts`.
    - [ ] Refine `ContactForm.tsx`, `Navigation.tsx`, and `EditorialReveal.tsx` for visual and functional consistency.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Design Consistency & A11y Polish' (Protocol in workflow.md)

## Phase 3: Code Architecture & Performance Tuning
- [ ] Task: Codebase & Performance Investigation
    - [ ] Analyze Three.js components for performance bottlenecks and TS type safety.
    - [ ] Document findings in `conductor/audit_reports/code_perf.md`.
- [ ] Task: Architectural Refactoring & Optimization
    - [ ] Write performance-focused tests in `src/__tests__/perf_tuning.test.ts`.
    - [ ] Refactor `SceneCanvas.tsx` and 3D scenes to minimize draw calls and improve memory management.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Code Architecture & Performance Tuning' (Protocol in workflow.md)
