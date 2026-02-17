# Specification: Comprehensive Profile Enrichment (2025 CV Update)

## Overview
This track involves a deep content synchronization between the 2025 CV and the portfolio website. We will expand the career timeline to include the foundational early years (2006-2012) as full "Architectural Epochs," create a new dedicated 3D Credentials section, and enrich the existing skills and case studies with leadership, soft skills, and AI strategy details.

## Functional Requirements
- **Career Timeline Expansion**:
    - Add MADAR International School (2009-2012), TCS (2008-2009), and WNS (2006-2008) as full "Architectural Epochs."
    - Update all roles with missing highlights from the 2025 CV (e.g., Rooftop's 90% customer satisfaction).
- **3D Credentials Section**:
    - Implement a new interactive section (positioned after Ecosystem) called "The Vault."
    - Visualize Education (St. Andrews College) and Certifications (Elasticsearch, Google) as unique 3D artifacts.
    - **Advanced 3D Effects**: Use custom GLSL shaders for a "scanline" or "holographic" aesthetic and interaction for smooth state-driven animations.
- **Skill Ecosystem Enrichment**:
    - Add "AI Strategy," "Design Thinking," "Team Building," and "Critical Thinking" as 3D modules.
    - Update the "Rooftop" case study narrative to explicitly detail AI/ML implementation.
- **Data Integrity**: Ensure all new data points in `src/data/` files are accurately reflected in the UI and tested.

## Non-Functional Requirements
- **Visual Consistency**: New epochs must match the existing animation and reveal logic.
- **Performance**: The new 3D Credentials section must maintain 60fps, utilizing shared geometries where possible.
- **Mobile Fit**: UI overlays for credentials must be fully responsive.

## Acceptance Criteria
- [ ] Career timeline shows a continuous 20-year progression starting from 2006.
- [ ] New "3D Credentials" section is interactive and visually distinct.
- [ ] Ecosystem grid includes the 4 new leadership/strategy modules.
- [ ] Rooftop case study mentions AI/ML solutions explicitly.
- [ ] All automated tests pass for the expanded data structures.

## Out of Scope
- Major redesign of the existing 3D background engine.
- Adding non-CV related content (e.g., blog posts).
