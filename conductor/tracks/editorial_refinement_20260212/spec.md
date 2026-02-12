# Specification: Refined Editorial Storytelling

## Overview
This track elevates the home page from a scrollable timeline to a "Refined Editorial" experience. It focuses on the transition between career epochs, using high-end typography animations and coordinated 3D motion to create a sense of architectural legacy and professional evolution.

## Functional Requirements
- **Epoch Typography Transitions**: Implement smooth, scroll-triggered text reveal animations for milestone titles and descriptions.
- **Coordinated 3D Motion**: Sync the `Timeline` 3D component more tightly with the HTML text, ensuring floating frames align with current reading focus.
- **Parallax Narrative Elements**: Add subtle background editorial elements (e.g., vertical "Year" markers, floating technical quotes) that move at different speeds.
- **Legacy Flourishes**: Implement "Epoch Indicators" (e.g., 01/05) that track progress through the architectural journey.

## Non-Functional Requirements
- **Fluidity**: All transitions must be 60fps and feel "weighted" (using Framer Motion spring physics).
- **Readability**: Ensure editorial flourishes do not distract from the primary career narrative.
- **Aesthetic**: Stick to the "Architectural Authority" system (Cormorant Garamond italic for narrative, JetBrains Mono for metadata).

## Acceptance Criteria
- [ ] Milestone text reveals with a sophisticated "reveal" animation as it enters the viewport.
- [ ] 3D geometric frames in the background shift position/rotation in sync with the editorial sections.
- [ ] Page-level "Epoch Progress" is clearly visible but subtle.
- [ ] Interaction remains smooth on all tested browsers.

## Out of Scope
- Full page-transition animations (focus is on internal scroll-based storytelling).
