# Implementation Plan: Architectural Deep-Dives

## Phase 1: Data & Routing [checkpoint: 240ec3d]
- [x] Task: Project Data Schema Expansion (297c5e4)
    - [x] Update `src/data/projects.ts` with detailed narratives, ADRs, and blueprint metadata.
    - [x] Create failing tests for the new project data structure.
- [x] Task: Dynamic Route Implementation (151789f)
    - [x] Build the core layout for `src/app/work/[slug]/page.tsx`.
    - [x] Implement breadcrumb navigation back to home.

## Phase 2: The Blueprint Engine [checkpoint: d02a297]
- [x] Task: Blueprint Overlay Component (a8cd0df)
    - [x] Create `BlueprintOverlay.tsx` for the 3D wireframe visualization.
    - [x] Implement the "Blueprint" toggle logic in the global `SceneCanvas` or via state.
- [x] Task: Project-Specific 3D Assets (a8cd0df)
    - [x] Implement simple 3D primitives or schematic models for the top 3 projects (Rooftop, Food Darzee, OnFees).

## Phase 3: Editorial Polishing & SEO [checkpoint: a47fd7f]
- [x] Task: ADR Editorial Component (c703289)
    - [x] Design and implement a high-fidelity React component for displaying ADRs.
- [x] Task: Project SEO Synchronization (ada3002)
    - [x] Implement `generateMetadata` for the dynamic routes using project data.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Case Study Review' (a47fd7f)
