# GEMINI.md

> **Single Source of Truth**: This repository adheres to the universal engineering standards, architecture blueprints, and skill catalog defined in [AGENTS.md](./AGENTS.md). Refer to `AGENTS.md` for complete tech stack specifications, coding invariants, commands, and curated system skills.

This file provides environment-specific guidance for Google Antigravity and Gemini CLI agents working in this repository.

---

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
<!-- CODEGRAPH_END -->

---

## Antigravity CLI Conventions

### 1. Task Tracking via Artifacts
Antigravity CLI does not feature a dedicated todo tool (`manage_task` manages background shell processes, not checklists).
- When executing multi-step workflows, maintain a markdown checklist artifact:
  - Path: `<appDataDir>/brain/<conversation-id>/task_list.md`
  - Write initially with `write_file` and update with `edit_file` as steps complete (`- [x]`).

### 2. Subagent Delegation
- Fresh-context tasks (such as EGM Goldfish reviews or parallel worker swarms) should be dispatched using `invoke_subagent`:
  - Full-capability subagent: `TypeName: "self"` (inherits parent configuration and write tools)
  - Read-only research: `TypeName: "research"`
  - Registered personas: Named personas such as `egm-design`, `egm-style`, etc.
- Antigravity supports reactive wakeup: do not poll running subagents in a loop. When a subagent completes, the system resumes context automatically.

### 3. Clickable File & Symbol Links
- Always format references to local files, classes, and methods as clickable Markdown links with file scheme:
  - `[filename.ts](file:///home/deadmantfa/Projects/portfolio-site/src/filename.ts#L10-L25)`

### 4. Verification Protocol
- Before concluding any coding or refactoring task, always run tests:
  ```bash
  npm test
  ```
- Refer to [AGENTS.md](./AGENTS.md) for full commands and verification invariants.
