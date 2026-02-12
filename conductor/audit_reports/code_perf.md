# Code Architecture & Performance Audit Report - 2026-02-12

## Performance Bottlenecks
- **CPU Vertex Updates**: 
    - `VisionaryScene.tsx` updates 1,600 positions every frame on the CPU.
    - Impact: High. Leads to frame drops on mobile and increases battery consumption.
    - Fix: Implement a custom ShaderMaterial using GLSL.
- **Resource Redundancy**:
    - `SkillModule.tsx` instantiates unique geometries and materials for every skill.
    - Impact: Medium. Increases memory usage and draw call overhead.
    - Fix: Use pre-allocated geometries and materials passed via props or context.

## Architectural Debt
- **Global State Pollution**:
    - Usage of `(window as any).scrollProgress` and `(window as any).activeSkill` bypasses React's declarative model.
    - Impact: High. Fragile and hard to test.
    - Fix: Implement a `ScrollProvider` using React Context or a lightweight state store (Zustand).
- **TypeScript Coverage**:
    - Frequent use of `any` in Three.js event handlers.
    - Fix: Define proper types for Three.js pointer events.

## Immediate Action Items
1. Refactor `VisionaryScene` to use a GPU-based shader.
2. Implement geometry/material sharing in `SkillModule`.
3. Standardize global state management.
