# Specification: Immersive Skill Redesign & Transition Fix

## Overview
This track focuses on transforming the "Ecosystem" (skills) section from a static curved wall into a "crazy amazing" immersive 3D experience—a **Vertical Knowledge Helix**. We will also resolve the technical issue where skills overlap subsequent sections like "Credentials".

## Functional Requirements
- **Vertical Helix Layout**: Redesign the skill arrangement into a dynamic vertical double helix or vortex.
    - Skills should spiral around a vertical axis.
    - The camera or the structure should move vertically as the user scrolls, providing a sense of "ascending" through the tech stack.
- **Section Transition (Overlap Fix)**: Ensure the `SkillNebula` component correctly exits or fades out when the user scrolls into the `Vault` (Credentials) section.
- **Occlusion Prevention**: Adjust the 3D structure's bounds or the info card's positioning to ensure no active skill modules are hidden behind the "Module Detail" card.
- **Enhanced Interactions**: Implement smoother, more organic hover responses using `Framer Motion` or R3F `lerp`.

## Non-Functional Requirements
- **Aesthetic**: Maintain the "Architectural Authority" dark-mode/glassmorphic aesthetic but with higher visual complexity.
- **Performance**: High-density 3D scene must maintain 60fps.
- **Responsiveness**: Ensure the vertical helix adapts to different screen widths (mobile vs desktop).

## Acceptance Criteria
- [ ] `SkillNebula` redesign complete: Skills are arranged in a vertical helix/vortex.
- [ ] Overlap issue resolved: Skills are completely invisible or moved out of frame when the `Vault` section is fully active.
- [ ] No skill modules are obscured by the detail card during the primary "Ecosystem" interaction phase.
- [ ] Full scroll synchronization verified: Skills assemble, stay active, and then "fly out" or fade during section exit.

## Out of Scope
- Major changes to the `careerData` or `projects` data structures.
- Changes to the contact form.
