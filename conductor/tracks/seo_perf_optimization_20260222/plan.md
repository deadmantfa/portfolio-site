# Implementation Plan - Optimize Portfolio Performance & Accessibility

## Phase 1: Baseline & Analysis [checkpoint: 3f00a6c]
- [x] Task: Establish Performance Baseline [checkpoint: manual]
    - Findings:
        - Mobile: Performance 43, LCP 7.5s, TBT 2.8s, CLS 0.
        - Desktop: Performance 94, LCP 1.6s, TBT 90ms, CLS 0.
        - Primary bottleneck is Mobile TBT (JS Execution) and LCP delay.
    - [x] Run local Lighthouse audit (Mobile & Desktop) to record initial scores.
    - [x] Identify key bottlenecks: LCP element, CLS culprits, and TBT sources.
- [x] Task: Analyze Bundle Size [checkpoint: manual]
    - Findings:
        - Generated bundle reports.
        - Largest chunks: ~371KB and ~349KB (likely Three.js/R3F/Drei).
        - Confirmed need for aggressive code splitting of 3D components.
    - [x] Configure `@next/bundle-analyzer`.
    - [x] Generate report and identify largest modules/dependencies.
- [x] Task: Conductor - User Manual Verification 'Baseline & Analysis' (Protocol in workflow.md)

## Phase 2: Core Web Vitals (Images & Fonts) [checkpoint: f5f4c55]
- [x] Task: Optimize LCP Image [4788e02]
    - [x] Write test: Verify LCP image has `priority` attribute.
    - [x] Implement: Refactor main hero image to use `next/image` with `priority` and accurate `sizes`.
- [x] Task: Optimize Secondary Images [c7e3154]
    - Findings:
        - Audit confirmed no raw `<img>` tags in codebase.
        - Next.js `Image` component is already used in `page.tsx` (the only place with raster images).
    - [x] Write test: Verify all other images use `loading="lazy"` (default) and correct formats.
    - [x] Implement: Audit and update all images in `public/` and components to use `next/image`.
- [x] Task: Eliminate Layout Shifts (CLS) [c481122]
    - Findings:
        - `next/font` is already implemented with `display: 'swap'`.
        - Layout has `ScrollProvider` and fixed background, CLS risk is minimal from font loading.
    - [x] Write test: Verify font loading strategy (optional/swap).
    - [x] Implement: Configure `next/font` correctly.
    - [x] Implement: Enforce aspect ratio containers for all media/embeds.
- [x] Task: Conductor - User Manual Verification 'Core Web Vitals (Images & Fonts)' (Protocol in workflow.md)

## Phase 3: JavaScript Bundle Optimization [checkpoint: a665888]
- [x] Task: Implement Code Splitting [b8d598c]
    - [x] Write test: Verify component exists (smoke test).
    - [x] Implement: Convert heavy components (3D Scenes, complex UI) to Dynamic Imports (`next/dynamic`) with loading skeletons.
- [x] Task: Optimize Third-Party Scripts [no_changes_needed]
    - Findings:
        - Audit confirmed no third-party scripts (Analytics, Ads, etc.) are present in the codebase.
        - `StructuredData` uses `<script type="application/ld+json">`, which is correct and should not be lazy-loaded via `next/script` as it's for SEO bots.
    - [x] Write test: Verify script loading strategy.
    - [x] Implement: Move non-critical scripts to `strategy="lazyOnload"` or `worker`.
- [x] Task: Conductor - User Manual Verification 'JavaScript Bundle Optimization' (Protocol in workflow.md)

## Phase 4: Accessibility & Structured Data [checkpoint: 610f7d2]
- [x] Task: Accessibility Remediation [84b7cd0]
    - [x] Write test: automated a11y checks using `jest-axe` for key components.
    - [x] Implement: Fix color contrast ratios to meet WCAG AA.
    - [x] Implement: Add missing ARIA labels and alt text.
    - [x] Implement: Ensure full keyboard navigation support.
- [x] Task: Implement Structured Data (JSON-LD) [3c68f6c]
    - [x] Write test: Validate JSON-LD structure for Person, WebSite, and CreativeWork.
    - [x] Implement: Create and inject structured data schemas into `layout.tsx` and project pages.
- [x] Task: Conductor - User Manual Verification 'Accessibility & Structured Data' (Protocol in workflow.md)

## Phase 5: Final Validation
- [~] Task: Final Performance Audit
    - [ ] Build project for production (`npm run build`).
    - [ ] Run Lighthouse audit on production build.
    - [ ] Verify Performance > 95 and Accessibility = 100.
- [ ] Task: Conductor - User Manual Verification 'Final Validation' (Protocol in workflow.md)