# Specification: Architectural Deep-Dives

## Overview
This track implements the "Architectural Authority" case study system. It moves beyond simple project descriptions to provide deep, evidence-based narratives of technical leadership. Each case study will feature a "Blueprint" mode—a 3D wireframe visualization of the system architecture—and structured Architectural Decision Records (ADRs).

## Functional Requirements
- **Dynamic Case Study Pages**: Implement a template for `src/app/work/[slug]/page.tsx` that renders project data.
- **Blueprint Overlay**: A high-end 3D wireframe overlay that reveals the structural "skeleton" of the project (e.g., microservices, data flow).
- **ADR Integration**: Display structured "Problem -> Solution -> Impact" logs for each project.
- **Narrative Storytelling**: Refined editorial layout for long-form technical explanations.

## Non-Functional Requirements
- **SEO Optimization**: Use Next.js Metadata API for project-specific meta tags (OpenGraph, JSON-LD).
- **Performance**: Lazy-load the 3D Blueprint overlay to maintain high Core Web Vitals.
- **Consistency**: Match the "Architectural Authority" design system (Cormorant Garamond, glass cards, primary OKLCH).

## Acceptance Criteria
- [ ] Navigating to a project slug (e.g., `/work/rooftop`) renders a high-fidelity case study.
- [ ] A "Blueprint" button toggles the 3D scene from the regular world to a technical wireframe view.
- [ ] Case studies include a section for Strategic Decisions (ADRs).
- [ ] Project-specific SEO data is correctly injected into the page head.

## Out of Scope
- A CMS (content remains local in `src/data/projects.ts` for this phase).
