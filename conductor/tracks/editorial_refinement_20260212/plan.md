# Implementation Plan: Refined Editorial Storytelling

## Phase 1: Typography & Global State
- [x] Task: Enhanced Reveal Animations (181b39b)
    - [x] Create a reusable `EditorialReveal` component using Framer Motion.
    - [x] Apply reveals to the milestone headings and descriptions in `src/app/page.tsx`.
- [x] Task: Scroll Progress Synchronization (181b39b)
    - [x] Refine the global scroll tracking logic to provide more granular "active epoch" indices to the 3D scene.

## Phase 2: Immersive Timeline Refinement
- [x] Task: 3D Frame Kinetic Sync (c679536)
    - [x] Update `src/components/Timeline.tsx` to respond dynamically to the active epoch index.
    - [x] Implement "frame focus" lighting effects in the 3D scene.
- [x] Task: Background Editorial Markers (c679536)
    - [x] Implement floating vertical typography for career years that scrolls at a parallax rate.

## Phase 3: Home Page Editorial Polish
- [x] Task: Final Layout Tuning (adf9700)
    - [x] Adjust spacing and line-heights for maximum "Architectural Authority" impact.
    - [x] Add subtle "Scanline" or "Grid" textures to active milestone cards.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Storytelling Review' (Protocol in workflow.md)
