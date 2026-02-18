# Implementation Plan: Portfolio Content Sync & UI Scalability

## Phase 1: Dynamic Project Synchronization
- [ ] Task: Dynamic Project Linking
    - [ ] Refactor `src/app/page.tsx` to map `careerData` to `projects` by company name or slug.
    - [ ] Remove hardcoded index checks (`index === 0 || index === 1 || index === 2`).
    - [ ] Write unit tests in `src/__tests__/projects_sync.test.ts` to verify all project-linked milestones show buttons.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Dynamic Project Synchronization' (Protocol in workflow.md)

## Phase 2: Scalable 3D Skill Visualization
- [ ] Task: 3D Skill Nebula Prototyping
    - [ ] Analyze `AssemblyScene.tsx` and determine migration path to a particle-based or node-based constellation.
    - [ ] Implement new `SkillNebula.tsx` component using R3F and `threejs-fundamentals`.
- [ ] Task: Interaction & Responsiveness
    - [ ] Add hover/click interactions to skill nodes.
    - [ ] Integrate with existing `ScrollProvider` for activation feedback.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Scalable 3D Skill Visualization' (Protocol in workflow.md)

## Phase 3: UI/UX Refinement & Quality Gate
- [ ] Task: Tailwind v4 Design Audit
    - [ ] Review all glass components for consistent OKLCH perception.
    - [ ] Polish the "Epochs" layout for better readability with the now-longer timeline.
- [ ] Task: Final Verification
    - [ ] Run full test suite.
    - [ ] Verify mobile responsiveness for the new 3D scene.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: UI/UX Refinement & Quality Gate' (Protocol in workflow.md)
