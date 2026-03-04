# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Next.js dev server at localhost:3000
npm run build        # Production build (includes CV PDF generation)
npm run lint         # Run ESLint
npm test             # Run all Vitest tests (single run)
CI=true npm test     # Run tests without watch mode (use in CI or scripted workflows)
npm run generate:cv  # Generate CV PDF from data
```

**Run a single test file:**
```bash
npx vitest run src/__tests__/ContactForm.test.tsx
```

**Run tests with coverage:**
```bash
npx vitest run --coverage
```

## Architecture

### App Structure
- **`src/app/`** — Next.js App Router. `page.tsx` is the single-page homepage; `work/[slug]/` generates static project case study pages from `src/data/projects.ts`. Server Actions live in `src/app/actions/contact.ts` (Resend email integration, `'use server'`).
- **`src/components/`** — 21 components split between 3D scenes (Three.js/R3F) and UI components.
- **`src/data/`** — Static content: `career.ts` (timeline), `projects.ts` (case studies), `skills.ts` (skill nodes).
- **`src/utils/helix.ts`** — Math utilities for positioning nodes on a double-helix curve.
- **`src/__tests__/`** — 35+ Vitest tests. Mirror component names (e.g. `SkillNebula.test.tsx`).
- **`conductor/`** — Project management docs: `plan.md` (task tracker), `tech-stack.md`, `workflow.md`, `code_styleguides/`.

### 3D Visualization Stack
Three.js + React Three Fiber (R3F) + Drei is used for all visual scenes:
- **`SceneCanvas`** wraps all R3F `<Canvas>` instances with shared config (`dpr={[1,2]}`).
- Each section has its own scene: `VisionaryScene` (hero), `SkillNebula` (skills helix), `VaultScene` (projects), `ConnectionScene` (contact), `AssemblyScene`, `BlueprintSchema`.
- Scroll-linked animations: `ScrollProvider` (context) tracks `scrollProgress` (0–1) and `activeEpoch`; 3D scenes read these to drive animations.

### Scroll & State
`ScrollProvider` is the central context for the homepage. It exposes:
- `scrollProgress` — normalized page scroll position
- `activeEpoch` — which career section is visible
- `activeSkill` / `activeCredential` — hovered/selected items

### Styling
Tailwind CSS v4 with a **CSS-first** configuration in `globals.css`. Theme colors use `oklch` variables (`--color-background`, `--color-foreground`, `--color-primary`, `--color-accent`). Custom utilities defined with `@utility`: `glass`, `scanline`, `tech-grid`, `vertical-text`.

### Path Alias
`@/` resolves to `src/`. Use it everywhere instead of relative paths.

## Conductor Workflow

Tasks are tracked in **`conductor/plan.md`** — the source of truth. Status markers:
- `[ ]` — pending
- `[~]` — in progress
- `[x] <7-char-sha>` — complete

**TDD is mandatory:** write failing tests (Red), implement to pass (Green), then refactor. Target >80% coverage for new code.

**Tech stack changes** must be documented in `conductor/tech-stack.md` *before* implementation.

### Commit Format
```
<type>(<scope>): <description>
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
Conductor commits use: `conductor(plan): ...`, `conductor(checkpoint): ...`

After each task commit, attach a git note summary:
```bash
git notes add -m "<summary>" <commit_hash>
```

## Code Style (from `conductor/code_styleguides/`)

- **Named exports only** — no default exports (`export { MyComponent }`)
- **No `any`** — use `unknown` or a specific type; avoid type assertions (`as`, `!`) without justification
- **`const` by default**, `let` when reassignment is needed, never `var`
- **No `public` modifier** on class members (it's the default); use `private`/`protected` to restrict
- **No `#private` fields** — use TypeScript's `private` keyword
- **Naming:** `UpperCamelCase` for types/classes/interfaces, `lowerCamelCase` for variables/functions, `CONSTANT_CASE` for global constants; no `_` prefix/suffix
- **Prettier**: single quotes, no semicolons, trailing commas, Tailwind class sorting (via `prettier-plugin-tailwindcss`)
- **Equality:** always `===` / `!==`

## Testing Conventions

- Test environment: jsdom (browser-like via `vitest.config.ts`)
- Globals enabled — `vi`, `describe`, `test`, `expect` are available without imports
- Setup file: `vitest.setup.ts` (mocks IntersectionObserver and other browser APIs)
- Co-locate tests in `src/__tests__/` matching component filenames
- Mock external dependencies (Resend, Three.js geometries) rather than hitting real services

## Project Overview

This is a high-end portfolio website for Wenceslaus Dsilva, positioning him as a premier candidate for high-level technology leadership roles. The site blends 20+ years of strategic leadership (2006-2026) with a sophisticated, morphing 3D geometric interface and refined editorial storytelling.

Key features include:
- **Architectural Epochs:** A sophisticated 3D scroll experience that reveals career milestones from 2006 to 2026
- **Dynamic Skill Cloud:** A reactive visualization of a diverse tech stack
- **Architectural Deep-Dives:** Project case studies featuring interactive 3D visualizations and Architectural Decision Records (ADRs)
- **Architectural Handshake:** A high-end contact interface integrated with a final 3D scene
- **Automated Executive CV:** Programmatically generated PDF CV that mirrors the portfolio's data and aesthetic

## Development Workflow

1. All work must be tracked in conductor plan files
2. Follow Test-Driven Development (write tests first)
3. Maintain >80% code coverage for new code
4. Document tech stack changes in `conductor/tech-stack.md` before implementation
5. Use named exports only (no default exports)
6. Follow the established code style guidelines
7. Ensure all changes are well-tested and documented