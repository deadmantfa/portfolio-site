# Implementation Plan: Immersive Skill Redesign & Transition Fix

## Phase 1: Transition & Overlap Remediation
- [ ] Task: Section Exit Logic
    - [ ] Update `src/app/page.tsx` to pass an `exitProgress` or a more granular `totalScroll` value to `SkillNebula`.
    - [ ] Implement exit animation in `SkillModule.tsx` (e.g., modules disperse or fly upwards when exiting).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Transition & Overlap Remediation' (Protocol in workflow.md)

## Phase 2: Immersive 3D Helix Implementation
- [ ] Task: Helix Mathematical Mapping
    - [ ] Refactor `SkillNebula.tsx` to use a vertical spiral / double-helix distribution for `endPos`.
    - [ ] Adjust camera/group vertical positioning based on `progress`.
- [ ] Task: Interaction Polish
    - [ ] Refine hover logic to "pull" modules toward the camera more smoothly.
    - [ ] Ensure `activeSkill` visibility is optimal relative to the info card.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Immersive 3D Helix Implementation' (Protocol in workflow.md)

## Phase 3: Visual Polish & Responsive Audit
- [ ] Task: Fine-tuning & Aesthetics
    - [ ] Add subtle particle effects or "Data Streams" to the helix if performance permits.
    - [ ] Final audit of glass materials and OKLCH highlights.
- [ ] Task: Final Quality Gate
    - [ ] Verify mobile responsiveness.
    - [ ] Ensure zero overlapping with the `Vault` and `Contact` sections.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Visual Polish & Responsive Audit' (Protocol in workflow.md)
