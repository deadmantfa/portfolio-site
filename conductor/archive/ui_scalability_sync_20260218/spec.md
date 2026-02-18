# Specification: Portfolio Content Sync & UI Scalability

## Overview
This track addresses two critical issues: 1) Newly added legacy projects are not appearing in the UI due to hardcoded rendering logic, and 2) The growing skill list is exceeding the capacity of the current 3D/UI layout. We will implement dynamic content synchronization and a new, scalable 3D skill ecosystem.

## Functional Requirements
- **Dynamic Case Study Rendering**: Refactor the `epochs` section in `src/app/page.tsx` to automatically detect and link to available case studies in `src/data/projects.ts` using company names or slugs as keys.
- **Scalable Skill Visualization**: Replace the current monolithic 3D skill assembly with a "Technical Nebula" or "Architectural Constellation" using Three.js. 
    - Support for 20+ skill nodes without visual clutter.
    - Improved interaction (hover/focus) using React Three Fiber.
- **UI/UX Polish**: 
    - Ensure consistent glassmorphism and OKLCH color usage (Tailwind v4 patterns).
    - Implement smooth scroll transitions between the expanded content sections.

## Non-Functional Requirements
- **Performance**: Maintain 60fps in the new 3D skill scene despite increased node count.
- **Scalability**: Data-driven UI that handles future career/skill additions without code changes.
- **A11y**: Ensure keyboard navigability for the new 3D skill nodes.

## Acceptance Criteria
- [ ] All legacy projects (IndieFolio, ePaisa, TCS/WNS, CouponDunia) have "View Case Study" buttons in their respective epoch sections.
- [ ] Case study links correctly route to `/work/[slug]`.
- [ ] New 3D skill scene renders all 25+ skills from `src/data/skills.ts` in a performant and aesthetically pleasing layout.
- [ ] Responsive design verified: skill cloud and project cards look premium on mobile and desktop.

## Out of Scope
- Creating new content (already handled in previous track).
- Changes to the contact form or footer logic.
