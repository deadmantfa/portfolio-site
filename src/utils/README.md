# utils

## Overview
The `utils` package provides stateless mathematical routines, geometry layout algorithms, data extraction adapters, and UI asset mappings for the portfolio application. Key responsibilities include assembling normalized resume models from static portfolio data for CV PDF rendering, formatting career and project case studies into markdown for GitHub profile synchronization, computing 3D Cartesian coordinates for Three.js animations (double helix and orbital layouts), and mapping skill badges to Lucide UI icon components.

## Interface
- [cv-data-extractor.ts:CVData](file:///home/deadmantfa/Projects/portfolio-site/src/utils/cv-data-extractor.ts#L5-L30): Interface defining the structured CV schema including personal info, summary, core metrics, experience milestones, and categorized skills.
- [cv-data-extractor.ts:extractCVData](file:///home/deadmantfa/Projects/portfolio-site/src/utils/cv-data-extractor.ts#L36-L89): Transforms static portfolio data sources (`careerData`, `projects`, `skillModules`) into the standardized `CVData` structure for PDF generation.
- [github-sync-utils.ts:mapCareerToMarkdown](file:///home/deadmantfa/Projects/portfolio-site/src/utils/github-sync-utils.ts#L5-L13): Formats an array of `CareerMilestone` records into a markdown string separated by dividers.
- [github-sync-utils.ts:mapProjectsToMarkdown](file:///home/deadmantfa/Projects/portfolio-site/src/utils/github-sync-utils.ts#L15-L19): Formats an array of `ProjectCaseStudy` records into markdown sections detailing role, company, period, impact, and tech stack tags.
- [github-sync-utils.ts:mapSkillsToMarkdown](file:///home/deadmantfa/Projects/portfolio-site/src/utils/github-sync-utils.ts#L21-L32): Groups and formats an array of `SkillModule` records into capitalized category bullet points.
- [helix.ts:calculateHelixPosition](file:///home/deadmantfa/Projects/portfolio-site/src/utils/helix.ts#L1-L27): Computes 3D `[x, y, z]` Cartesian coordinates for nodes along an 8-rotation double-helix curve with radial wave expansion.
- [orbital.ts:CATEGORY_CONFIG](file:///home/deadmantfa/Projects/portfolio-site/src/utils/orbital.ts#L3-L8): Configuration object defining immutable orbital geometry (radius, color, rotation speed) for each category key.
- [orbital.ts:CategoryKey](file:///home/deadmantfa/Projects/portfolio-site/src/utils/orbital.ts#L10): Type representing keys of `CATEGORY_CONFIG` (`'leadership' | 'frontend' | 'backend' | 'infrastructure'`).
- [orbital.ts:DistributedNode](file:///home/deadmantfa/Projects/portfolio-site/src/utils/orbital.ts#L14-L18): Data structure representing a positioned orbital node with attached `SkillModule`, `radius`, and `angle`.
- [orbital.ts:distributeSkillsOnRing](file:///home/deadmantfa/Projects/portfolio-site/src/utils/orbital.ts#L20-L48): Distributes skills evenly along a single radial ring or splits into dual concentric sub-rings when exceeding capacity.
- [skillIcons.ts:SKILL_ICONS](file:///home/deadmantfa/Projects/portfolio-site/src/utils/skillIcons.ts#L9-L39): Dictionary mapping skill identifier strings to Lucide icon components.
- [skillIcons.ts:getSkillIcon](file:///home/deadmantfa/Projects/portfolio-site/src/utils/skillIcons.ts#L41-L43): Resolves a Lucide icon component by skill name, falling back to `Code2` for unregistered skills.
- Subdirectories: None (leaf package).

## Invariants
- [cv-data-extractor.ts:extractCVData](file:///home/deadmantfa/Projects/portfolio-site/src/utils/cv-data-extractor.ts#L63-L80): Skill counts per category (`frontend`, `backend`, `infrastructure`, `leadership`) are capped at a maximum of 8 items via `.slice(0, 8)`.
- [cv-data-extractor.ts:extractCVData](file:///home/deadmantfa/Projects/portfolio-site/src/utils/cv-data-extractor.ts#L50-L51): Metrics extraction queries `projects` specifically for `slug === 'rooftop'`; defaults to an empty array `[]` if not found.
- [cv-data-extractor.ts:extractCVData](file:///home/deadmantfa/Projects/portfolio-site/src/utils/cv-data-extractor.ts#L59): Career milestone highlights default to `[]` when undefined.
- [orbital.ts:distributeSkillsOnRing](file:///home/deadmantfa/Projects/portfolio-site/src/utils/orbital.ts#L24-L47): Ring splitting occurs when `skills.length > 12` (`MAX_PER_RING`), partitioning skills into an inner ring (`baseRadius - 0.8`) and an outer ring (`baseRadius + 0.8`).
- [orbital.ts:distributeSkillsOnRing](file:///home/deadmantfa/Projects/portfolio-site/src/utils/orbital.ts#L45): Outer ring items are offset by an angular phase shift of `Math.PI / outer.length` radians to stagger positions relative to inner ring items.
- [helix.ts:calculateHelixPosition](file:///home/deadmantfa/Projects/portfolio-site/src/utils/helix.ts#L12-L13): Even-indexed elements (`index % 2 === 0`) are phase-shifted by `Math.PI` radians to form the complementary strand of the double helix across 8 full rotations (`rotations = 8`).
- [skillIcons.ts:getSkillIcon](file:///home/deadmantfa/Projects/portfolio-site/src/utils/skillIcons.ts#L41-L43): Falls back to `Code2` icon for any skill name not present in `SKILL_ICONS`.

## Side Effects
- None: All exported functions in this package are pure computations without side effects, disk I/O, network requests, or mutations of external state.

## Verification
- Run: `npm test`
