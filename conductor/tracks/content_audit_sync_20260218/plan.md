# Implementation Plan: Comprehensive Content Audit & Portfolio Sync (2006-2026)

## Phase 1: Microscopic Audit & Data Extraction
- [ ] Task: Systematic CV Analysis
    - [ ] Create `conductor/audit_reports/cv_extraction_log.md` to document findings.
    - [ ] Read and analyze `public/CV/Wenceslaus-Dsilva-2018.pdf` (and 2019-2025) for:
        - [ ] Missing technical skills (e.g., Quantum, SPSS, specific AWS services).
        - [ ] Quantitative metrics (% improvement, user numbers, cost savings).
        - [ ] Legacy project details (IndieFolio, ePaisa, Tata, WNS).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Microscopic Audit & Data Extraction' (Protocol in workflow.md)

## Phase 2: Core Data Expansion & Skill Integration
- [ ] Task: Global Skill Cloud Expansion
    - [ ] Update `src/data/skills.ts` with all identified missing technologies.
    - [ ] Categorize new skills (Legacy/Foundational vs. Modern) but integrate them into the main view.
- [ ] Task: Career Milestone Refinement
    - [ ] Update `src/data/career.ts` with precise metrics and expanded impact highlights for all 10+ milestones.
    - [ ] Ensure historical accuracy and alignment with the most recent CV (2025).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Data Expansion & Skill Integration' (Protocol in workflow.md)

## Phase 3: Legacy Project Recovery & Deep Dives
- [ ] Task: Narrative Synthesis & ADR Creation
    - [ ] Draft new "Problem -> Solution -> Impact" ADRs for significant legacy projects (IndieFolio, ePaisa, Tata, WNS) based on extracted data.
    - [ ] Create 3D Blueprint configurations (`ProjectBlueprint` interface) for these projects.
- [ ] Task: Project Catalog Expansion
    - [ ] Add new `ProjectCaseStudy` entries to `src/data/projects.ts` for at least 4 key legacy projects.
    - [ ] Verify TypeScript compliance and narrative tone consistency ("Architectural Authority").
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Legacy Project Recovery & Deep Dives' (Protocol in workflow.md)
