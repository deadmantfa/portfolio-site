# Implementation Plan: Portfolio Content Sync & UI Scalability

## Phase 1: Dynamic Project Synchronization
- [x] Task: Dynamic Project Linking (c2c0b27)
    - [x] Refactor `src/app/page.tsx` to map `careerData` to `projects` by company name or slug.
    - [x] Remove hardcoded index checks (`index === 0 || index === 1 || index === 2`).
    - [x] Write unit tests in `src/__tests__/projects_sync.test.ts` to verify all project-linked milestones show buttons.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Dynamic Project Synchronization' (Protocol in workflow.md) (c2c0b27)

## Phase 2: Scalable 3D Skill Visualization
- [x] Task: 3D Skill Nebula Prototyping (4e62909)
    - [x] Analyze `AssemblyScene.tsx` and determine migration path to a particle-based or node-based constellation.
    - [x] Implement new `SkillNebula.tsx` component using R3F and `threejs-fundamentals`.
- [x] Task: Interaction & Responsiveness (4e62909)
    - [x] Add hover/click interactions to skill nodes.
    - [x] Integrate with existing `ScrollProvider` for activation feedback.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Scalable 3D Skill Visualization' (Protocol in workflow.md) (4e62909)

## Phase 3: UI/UX Refinement & Quality Gate
- [x] Task: Tailwind v4 Design Audit (c2b8068)
    - [x] Review all glass components for consistent OKLCH perception.
    - [x] Polish the "Epochs" layout for better readability with the now-longer timeline.
- [x] Task: Final Verification (c2b8068)
    - [x] Run full test suite.
    - [x] Verify mobile responsiveness for the new 3D scene.
- [x] Task: Conductor - User Manual Verification 'Phase 3: UI/UX Refinement & Quality Gate' (Protocol in workflow.md) (c2b8068)

## Phase: Review Fixes
- [x] Task: Apply review suggestions (0fccb5c)
