# Implementation Plan: Architectural Deep-Dives

## Phase 1: Data & Routing
- [x] Task: Project Data Schema Expansion (297c5e4)
    - [x] Update `src/data/projects.ts` with detailed narratives, ADRs, and blueprint metadata.
    - [x] Create failing tests for the new project data structure.
- [x] Task: Dynamic Route Implementation (151789f)
    - [x] Build the core layout for `src/app/work/[slug]/page.tsx`.
    - [x] Implement breadcrumb navigation back to home.

## Phase 2: The Blueprint Engine
- [ ] Task: Blueprint Overlay Component
    - [ ] Create `BlueprintOverlay.tsx` for the 3D wireframe visualization.
    - [ ] Implement the "Blueprint" toggle logic in the global `SceneCanvas` or via state.
- [ ] Task: Project-Specific 3D Assets
    - [ ] Implement simple 3D primitives or schematic models for the top 3 projects (Rooftop, Food Darzee, OnFees).

## Phase 3: Editorial Polishing & SEO
- [ ] Task: ADR Editorial Component
    - [ ] Design and implement a high-fidelity React component for displaying ADRs.
- [ ] Task: Project SEO Synchronization
    - [ ] Implement `generateMetadata` for the dynamic routes using project data.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Case Study Review'
