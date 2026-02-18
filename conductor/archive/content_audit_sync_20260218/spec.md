# Specification: Comprehensive Content Audit & Portfolio Sync (2006-2026)

## Overview
This track involves a microscopic audit and synchronization of the portfolio with all available CV versions (2018-2025). The goal is to ensure 100% data fidelity, capturing every skill, metric, and legacy project to solidify the "Architectural Authority" narrative. We will transform "hidden" CV details into interactive portfolio assets (ADRs, Blueprints, and Skill Modules).

## Functional Requirements
- **Deep PDF Audit**: Systematically analyze all files in `public/CV/` for missing technical skills, tool versions, and quantitative metrics (e.g., % improvements, traffic numbers, cost savings).
- **Legacy Project Recovery**: Identify and re-integrate significant projects from early career phases (e.g., IndieFolio, ePaisa, CouponDunia, MADAR, Tata, WNS) that are currently under-represented.
- **Data Synchronization & Expansion**:
    - **`skills.ts`**: Map granular tools (Elasticsearch, Quantum, SPSS, Shell Scripting, specific AWS services) to the global skill cloud.
    - **`career.ts`**: Refine all milestones with microscopic metrics and expanded impact highlights.
    - **`projects.ts`**: Create new `ProjectCaseStudy` entries for major legacy projects, including 3D Blueprint configurations and synthesized ADRs.
- **Narrative & ADR Synthesis**: Extract "Problem -> Solution -> Impact" sequences from CV descriptions and convert them into structured Architectural Decision Records (ADRs).
- **Full Historical Integration**: Present early-career technologies as part of the core technical breadth, demonstrating the 20-year evolution of expertise.

## Non-Functional Requirements
- **Content Accuracy**: 100% alignment with facts presented in official CV documents.
- **Editorial Tone**: Maintain the "Architectural Authority" voice—sophisticated, professional, and impact-focused—in all newly generated text.
- **Data Integrity**: Ensure all new project and skill entries adhere to existing TypeScript interfaces.

## Acceptance Criteria
- [ ] Audit log created documenting all extracted "microscopic" details from the CV PDF series.
- [ ] `skills.ts` expanded with 100% of technical keywords identified during the audit.
- [ ] `career.ts` updated with precise metrics and expanded highlights for all 10+ milestones.
- [ ] `projects.ts` expanded with at least 4 new "Deep-Dive" case studies for significant legacy projects (e.g., IndieFolio, ePaisa, Tata, WNS).
- [ ] All new ADRs and narratives verified for stylistic consistency with the "Visionary Architect" persona.

## Out of Scope
- Modifications to the 3D rendering engine (using existing `BlueprintEngine` and `SceneCanvas`).
- Design-system-level changes (e.g., changing colors or base typography).
