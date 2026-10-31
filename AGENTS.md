# AGENTS.md

> **Universal AI Agent Configuration & Single Source of Truth**  
> This file is the primary, vendor-neutral configuration and operational standard for all AI coding agents (Claude Code, Google Antigravity / Gemini CLI, Cursor, GitHub Copilot, Codex, etc.) working in this repository.

---

## 1. System Identity & Architecture

**Project**: Executive Engineering & Leadership Portfolio for Wenceslaus Dsilva (CTO / VP Engineering).  
**Repository**: `deadmantfa/portfolio-site`

### Core Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org) (App Router, React Server Components, Server Actions)
- **Runtime & UI**: [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config via `globals.css` using OKLCH colors)
- **3D Graphics & Animation**: [Three.js](https://threejs.org), [@react-three/fiber](https://r3f.docs.pmnd.rs), [@react-three/drei](https://github.com/pmndrs/drei), [GSAP](https://gsap.com), [Framer Motion](https://motion.dev)
- **Testing**: [Vitest](https://vitest.dev) (jsdom environment with `@testing-library/react` and `vitest.setup.ts`)
- **Document Generation**: [@react-pdf/renderer](https://react-pdf.org), [Puppeteer](https://pptr.dev), [PDFKit](https://pdfkit.org)
- **Outbound Services**: [Resend](https://resend.com) (transactional inquiry delivery), [Anthropic](https://anthropic.com) / [Google Gemini](https://ai.google.dev) (AI chat advisory fallback)

### Directory Anatomy & Architectural Contracts
The repository implements Elephant-and-Goldfish Model (EGM) directory contracts:
- [README.md](./README.md): Repository Root Blueprint (high-altitude architecture, system invariants, security headers)
- [src/README.md](./src/README.md): Intermediate Blueprint grouping core application subsystems
  - [src/app/README.md](./src/app/README.md): App Router layouts, metadata, error boundaries, routes
    - [src/app/about/README.md](./src/app/about/README.md): Executive biography and career history
    - [src/app/actions/README.md](./src/app/actions/README.md): Server Actions (`sendEmail` via Resend)
    - [src/app/api/README.md](./src/app/api/README.md): Backend API routing container
    - [src/app/api/chat/README.md](./src/app/api/chat/README.md): Conversational AI endpoint with failover
    - [src/app/contact/README.md](./src/app/contact/README.md): Contact and advisory consultation
    - [src/app/for/README.md](./src/app/for/README.md): Tailored stakeholder presentations container
    - [src/app/privacy/README.md](./src/app/privacy/README.md): Privacy disclosures and user rights
    - [src/app/work/README.md](./src/app/work/README.md): Deep-dive case studies and ADR presentation
  - [src/components/README.md](./src/components/README.md): 3D scenes, scroll choreography, UI widgets
  - [src/components/ui/README.md](./src/components/ui/README.md): Radix slot & Tailwind UI primitives
  - [src/data/README.md](./src/data/README.md): Static domain models (career, projects, skills, repos, testimonials)
  - [src/hooks/README.md](./src/hooks/README.md): Custom hooks (dynamic scroll favicon progress)
  - [src/lib/README.md](./src/lib/README.md): Class name merging helper (`cn`)
  - [src/utils/README.md](./src/utils/README.md): 3D math layouts (helix, orbital rings) and CV extraction
- [scripts/README.md](./scripts/README.md): Automated CV PDF generation and GitHub profile sync
- `conductor/`: Project tracking and task workflow records (`conductor/plan.md`, `conductor/tech-stack.md`)

---

## 2. Essential Commands

```bash
# Development
npm run dev              # Start Next.js local dev server at localhost:3000

# Building & Bundling
npm run build            # Production Next.js build (invokes CV PDF generation)
npm run generate:cv      # Programmatically render CV PDF from data

# Code Quality & Testing
npm run lint             # Run ESLint validation
npm test                 # Run Vitest test suite (single run)
CI=true npm test         # Run tests in non-watch mode (scripted / CI workflow)
npx vitest run <path>    # Run a targeted test file (e.g. npx vitest run src/__tests__/Navigation.test.tsx)
npx vitest run --coverage # Run test suite with V8 code coverage report
```

---

## 3. Engineering Invariants & Coding Standards

1. **Named Exports Only**:
   - Always use named exports for components, utilities, and models (`export { MyComponent }`, `export function calculate()`).
   - Exception: Next.js file-based routing conventions requiring default exports (`page.tsx`, `layout.tsx`, `not-found.tsx`, `error.tsx`, `loading.tsx`, `opengraph-image.tsx`, `icon.tsx`, `sitemap.ts`, `robots.ts`).
2. **Type Safety (Strict Mode)**:
   - Zero `any` policy: use `unknown`, type guards, or explicit types.
   - Avoid unwarranted type assertions (`as`, `!`) unless interacting with legacy dynamic browser APIs.
   - Path alias: `@/` resolves directly to `src/`. Always use `@/` instead of relative directory hopping.
3. **Styling & Theming**:
   - Tailwind CSS v4 CSS-first config located in `src/app/globals.css`.
   - Colors are defined using OKLCH variables: `--color-background`, `--color-foreground`, `--color-primary`, `--color-accent`.
   - Custom utilities defined with `@utility`: `glass`, `scanline`, `tech-grid`, `vertical-text`.
4. **State & Scroll Architecture**:
   - `ScrollProvider` (`src/components/ScrollProvider.tsx`) is the single source of truth for viewport progress (0–1), active career epoch, and selected skills.
   - Respect user accessibility preferences: check `prefers-reduced-motion` before firing GSAP scrambler or glitch loops.
5. **Test-Driven Development (TDD)**:
   - Mandatory Red-Green-Refactor flow for all logic changes.
   - Tests live in `src/__tests__/` matching component or utility names.
   - Target >80% test coverage for new additions.
6. **Task & Conductor Tracking**:
   - Active work streams track tasks in `conductor/plan.md` using status markers: `[ ]` pending, `[~]` in progress, `[x] <sha>` complete.
   - Commit convention: `<type>(<scope>): <description>` (e.g., `feat(3d): add orbital particle layer`).

---

## 4. CodeGraph Discovery Protocol

In repositories indexed by CodeGraph (`.codegraph/` exists at root), **always reach for CodeGraph exploration BEFORE grep or find**:
- **MCP Tool**: `codegraph_explore` retrieves verbatim source and call graphs across dynamic dispatches in a single turn.
- **Shell**: `codegraph explore "<symbol names or question>"` outputs the same call path analysis.

---

## 5. Curated System Skills Directory

The environment provides pre-installed, domain-specialized skills located in `~/.agents/skills/` (shared by Claude Code via `~/.claude/skills/` and Gemini/Antigravity via `~/.gemini/skills/`). Agents should invoke these skills for specialized tasks:

| Domain | Skill | When to Activate |
| :--- | :--- | :--- |
| **Next.js & React** | `nextjs-developer` | Architecture decisions for App Router, Server Actions, Route Handlers, metadata, performance. |
| **React Architecture** | `react-expert` | React 19 concurrent features, custom hook composition, component lifecycle patterns. |
| **Type Design** | `typescript-pro` | Strict type definitions, utility types, discriminated unions, and interface segregation. |
| **UI/UX & Aesthetics** | `ui-ux-pro-max` | High-end visual hierarchy, typography, responsive layout, motion design, design-system checks. |
| **Tailwind Styling** | `ui-styling` | Tailwind CSS v4 token patterns, glassmorphism, responsive breakpoints, accessible contrast. |
| **Test-Driven Dev** | `test-driven-development` (`tdd`) | Writing unit, integration, and UI tests before code implementation. |
| **Quality Verification** | `verification-before-completion` | Validating builds, linting, and automated tests before declaring tasks done. |
| **Debugging** | `systematic-debugging` | Isolating root causes of test failures, hydration mismatches, or WebGL shader glitches. |
| **Code Review** | `code-review` / `code-reviewer` | Pre-commit sanity review, invariant validation, and styleguide compliance. |
| **Planning & Execution** | `writing-plans` / `executing-plans` | Structuring multi-step features into verifiable checkpointed tasks. |
| **Agent Delegation** | `subagent-driven-development` | Orchestrating parallel subagents across independent codebase partitions. |
| **EGM Documentation** | `egm-bootstrap`, `egm-review`, `egm-drift-report` | Creating, reviewing, and checking drift for EGM directory contracts. |

---

## 6. Harness-Specific Integration Files

- **Claude Code**: See [CLAUDE.md](./CLAUDE.md) for Claude-specific MCP settings and terminal permissions.
- **Google Antigravity / Gemini CLI**: See [GEMINI.md](./GEMINI.md) for Antigravity tool mappings and subagent workflows.
- **Generic / Other Tools**: Reference this file ([AGENTS.md](./AGENTS.md)) and [.agent](./.agent).
