# data

## Overview
Static domain datasets and configuration models powering the portfolio site. Contains structured data for career milestones, project case studies and architectural decision records (ADRs), skill taxonomies, client and peer testimonials, open-source repositories, personalized share campaigns, contact availability settings, and the AI chatbot knowledge base prompt builder.

## Interface
- `[src/data/career.ts:CareerMilestone]`: Interface defining the schema for career history entries including timeframe, role, company, narrative, and key achievements.
- `[src/data/career.ts:careerData]`: Constant array of `CareerMilestone` records detailing professional positions and achievements.
- `[src/data/chatKnowledgeBase.ts:buildSystemPrompt]`: Function that compiles case studies, career milestones, and categorized skills into a comprehensive system prompt string for the AI persona.
- `[src/data/chatKnowledgeBase.ts:STARTER_QUESTIONS]`: Constant tuple of three default prompt questions guiding user interactions with the AI assistant.
- `[src/data/contact.ts:AvailabilityStatus]`: Type alias restricting availability state to `'open' | 'closed'`.
- `[src/data/contact.ts:ContactConfig]`: Interface defining contact scheduling configuration properties (`calLink`, `availabilityStatus`, `availabilityNote`).
- `[src/data/contact.ts:contactConfig]`: Constant configuration object adhering to `ContactConfig`.
- `[src/data/projects.ts:ADR]`: Interface defining the structure of Architectural Decision Records (`title`, `problem`, `solution`, `impact`, and optional legacy fields).
- `[src/data/projects.ts:ProjectHighlight]`: Interface defining key metric label-value pairs for projects.
- `[src/data/projects.ts:ProjectNarrative]`: Interface defining the structure of project vision, execution steps, and resulting impacts.
- `[src/data/projects.ts:ProjectBlueprint]`: Interface specifying architectural diagram parameters (`type`, `nodes`, `connections`).
- `[src/data/projects.ts:ProjectCaseStudy]`: Interface defining comprehensive project case study schema including narratives, ADRs, metrics, and technology stacks.
- `[src/data/projects.ts:projects]`: Constant array of `ProjectCaseStudy` records representing featured engineering and leadership initiatives.
- `[src/data/repos.ts:RepoCard]`: Interface defining metadata for open-source repositories (`name`, `description`, `language`, `stars`, `forks`, `topics`, `url`).
- `[src/data/repos.ts:LANGUAGE_COLORS]`: Constant dictionary mapping programming language names to hex color codes.
- `[src/data/repos.ts:repos]`: Constant array of featured open-source repository records.
- `[src/data/shares.ts:ShareEntry]`: Interface defining personalized share page content (`company`, `message`, `accentLabel`).
- `[src/data/shares.ts:shares]`: Constant record mapping company slug identifiers to personalized greeting configurations.
- `[src/data/skills.ts:SkillModule]`: Interface defining technical and leadership skills with categorizations and strategic importance descriptions.
- `[src/data/skills.ts:skillModules]`: Constant array of skill items classified by category (`frontend`, `backend`, `infrastructure`, `leadership`).
- `[src/data/testimonials.ts:Testimonial]`: Interface defining colleague and client endorsement records (`quote`, `name`, `title`, `company`, `initials`, optional `linkedinUrl`, optional `imagePath`).
- `[src/data/testimonials.ts:testimonials]`: Constant array of endorsement records.

## Invariants
- `[src/data/career.ts:careerData]`: Milestones must be maintained in reverse chronological order (most recent first).
- `[src/data/chatKnowledgeBase.ts:buildSystemPrompt]`: Function is deterministic and pure, assembling prompt text from imported datasets without mutating source collections.
- `[src/data/chatKnowledgeBase.ts:STARTER_QUESTIONS]`: Must remain a fixed-length 3-tuple of non-empty prompt strings.
- `[src/data/contact.ts:contactConfig]`: The `availabilityStatus` property must match the `'open' | 'closed'` union constraint.
- `[src/data/projects.ts:projects]`: Every case study must have a unique URL-safe `slug` and define a valid `blueprint.type` belonging to `'monolith' | 'microservices' | 'serverless' | 'hub-and-spoke'`.
- `[src/data/repos.ts:LANGUAGE_COLORS]`: Must include hex color definitions corresponding to every programming language present in `repos`.
- `[src/data/shares.ts:shares]`: Key names must serve as lowercase URL-safe slug identifiers matching campaign routes.
- `[src/data/skills.ts:skillModules]`: Each entry's `category` must strictly belong to `'frontend' | 'backend' | 'infrastructure' | 'leadership'`.
- `[src/data/testimonials.ts:testimonials]`: All testimonial items must supply valid, non-empty text for `quote`, `name`, `title`, `company`, and `initials`.

## Side Effects
- `[src/data/career.ts]`: None. Pure static constant exports with no runtime mutations or external I/O.
- `[src/data/chatKnowledgeBase.ts]`: None. In-memory string formatting and static constant exports with zero external calls or state mutations.
- `[src/data/contact.ts]`: None. Pure static constant exports with no runtime mutations or external I/O.
- `[src/data/projects.ts]`: None. Pure static constant exports with no runtime mutations or external I/O.
- `[src/data/repos.ts]`: None. Pure static constant exports with no runtime mutations or external I/O.
- `[src/data/shares.ts]`: None. Pure static constant exports with no runtime mutations or external I/O.
- `[src/data/skills.ts]`: None. Pure static constant exports with no runtime mutations or external I/O.
- `[src/data/testimonials.ts]`: None. Pure static constant exports with no runtime mutations or external I/O.

## Verification
- Run: `npm test`
