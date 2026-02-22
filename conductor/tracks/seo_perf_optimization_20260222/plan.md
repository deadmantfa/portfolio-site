# Implementation Plan - Optimize Portfolio Performance & Accessibility

## Phase 1: Baseline & Analysis
- [ ] Task: Establish Performance Baseline
    - [ ] Run local Lighthouse audit (Mobile & Desktop) to record initial scores.
    - [ ] Identify key bottlenecks: LCP element, CLS culprits, and TBT sources.
- [ ] Task: Analyze Bundle Size
    - [ ] Configure `@next/bundle-analyzer`.
    - [ ] Generate report and identify largest modules/dependencies.
- [ ] Task: Conductor - User Manual Verification 'Baseline & Analysis' (Protocol in workflow.md)

## Phase 2: Core Web Vitals (Images & Fonts)
- [ ] Task: Optimize LCP Image
    - [ ] Write test: Verify LCP image has `priority` attribute.
    - [ ] Implement: Refactor main hero image to use `next/image` with `priority` and accurate `sizes`.
- [ ] Task: Optimize Secondary Images
    - [ ] Write test: Verify all other images use `loading="lazy"` (default) and correct formats.
    - [ ] Implement: Audit and update all images in `public/` and components to use `next/image`.
- [ ] Task: Eliminate Layout Shifts (CLS)
    - [ ] Write test: Verify font loading strategy (optional/swap).
    - [ ] Implement: Configure `next/font` correctly.
    - [ ] Implement: Enforce aspect ratio containers for all media/embeds.
- [ ] Task: Conductor - User Manual Verification 'Core Web Vitals (Images & Fonts)' (Protocol in workflow.md)

## Phase 3: JavaScript Bundle Optimization
- [ ] Task: Implement Code Splitting
    - [ ] Write test: Verify component exists (smoke test).
    - [ ] Implement: Convert heavy components (3D Scenes, complex UI) to Dynamic Imports (`next/dynamic`) with loading skeletons.
- [ ] Task: Optimize Third-Party Scripts
    - [ ] Write test: Verify script loading strategy.
    - [ ] Implement: Move non-critical scripts to `strategy="lazyOnload"` or `worker`.
- [ ] Task: Conductor - User Manual Verification 'JavaScript Bundle Optimization' (Protocol in workflow.md)

## Phase 4: Accessibility & Structured Data
- [ ] Task: Accessibility Remediation
    - [ ] Write test: automated a11y checks using `jest-axe` for key components.
    - [ ] Implement: Fix color contrast ratios to meet WCAG AA.
    - [ ] Implement: Add missing ARIA labels and alt text.
    - [ ] Implement: Ensure full keyboard navigation support.
- [ ] Task: Implement Structured Data (JSON-LD)
    - [ ] Write test: Validate JSON-LD structure for Person, WebSite, and CreativeWork.
    - [ ] Implement: Create and inject structured data schemas into `layout.tsx` and project pages.
- [ ] Task: Conductor - User Manual Verification 'Accessibility & Structured Data' (Protocol in workflow.md)

## Phase 5: Final Validation
- [ ] Task: Final Performance Audit
    - [ ] Build project for production (`npm run build`).
    - [ ] Run Lighthouse audit on production build.
    - [ ] Verify Performance > 95 and Accessibility = 100.
- [ ] Task: Conductor - User Manual Verification 'Final Validation' (Protocol in workflow.md)