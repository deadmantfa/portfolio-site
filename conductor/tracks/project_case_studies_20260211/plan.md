# Implementation Plan: Project Case Studies Deep-Dive

## Phase 1: Data Architecture & Dynamic Routing [checkpoint: d724d77]
- [x] Task: Project Content Schema (271dca5)
    - [ ] Define TypeScript interfaces for project case studies
    - [ ] Create structured local data for key projects (OnFees, CashBoss, Rooftop)
- [x] Task: Dynamic Work Routes (5da92f8)
    - [ ] Create failing tests for \/work/[slug]\ route generation
    - [ ] Implement \generateStaticParams\ and dynamic layout
- [x] Task: Conductor - User Manual Verification 'Phase 1: Data Architecture & Dynamic Routing' (d724d77)

## Phase 2: Editorial UI & SEO
- [x] Task: Case Study Page Layout (92b555c)
    - [ ] Write tests for the editorial component structure (Challenge, ADRs, Results)
    - [ ] Implement the responsive high-end UI using Tailwind CSS
- [~] Task: SEO & Metadata
    - [ ] Implement dynamic Next.js Metadata for every project page
    - [ ] Add JSON-LD structured data for career/project entities
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Editorial UI & SEO' (Protocol in workflow.md)

## Phase 3: Interactive 3D Blueprint Mode
- [ ] Task: 3D Workspace Transformation
    - [ ] Implement state management to trigger \"Blueprint\" mode in the 3D scene
    - [ ] Create specialized 3D annotations/nodes for architectural visualization
- [ ] Task: Smooth Navigation Transitions
    - [ ] Implement Framer Motion shared layout transitions between timeline nodes and work pages
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Interactive 3D Blueprint Mode' (Protocol in workflow.md)
