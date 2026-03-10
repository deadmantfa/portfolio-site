# Implementation Plan: CTO Engagement Features

Design doc: `docs/plans/2026-03-11-three-features-design.md`

Three additive features targeting direct-share-to-executive use case. Existing 3D experience unchanged. Order: simplest → most complex (Feature 3 → 2 → 1).

---

## Phase 1: Strategy Call CTA (Feature 3)

### Task 1.1 — contact.ts data file
- [ ] Create `src/data/contact.ts` with `calendlyUrl: string` and `availabilityStatus: 'open' | 'closed'`
- [ ] Write test: `src/__tests__/contact.test.ts` — validates shape and non-empty URL

### Task 1.2 — StrategyCallCTA component (TDD)
- [ ] Write failing tests in `src/__tests__/StrategyCallCTA.test.tsx`:
  - Renders outer `glass rounded-[2.5rem]` container
  - Renders "DIRECT ENGAGEMENT" mono label
  - Renders heading with `font-serif italic`
  - Renders availability dot when status is `'open'`
  - Renders Calendly link with `target="_blank" rel="noopener noreferrer"`
  - Renders "or scroll down to write" fallback label
  - Matches `prefers-reduced-motion` (no animation attributes in reduced motion)
- [ ] Implement `src/components/StrategyCallCTA.tsx` (named export) to pass all tests
- [ ] Verify: `whileInView` animation matches existing `ContactForm` pattern

### Task 1.3 — Wire into homepage
- [ ] Modify `src/app/page.tsx`: insert `<StrategyCallCTA />` above `<ContactForm />` in the contact section
- [ ] Write test: `src/__tests__/page.test.tsx` update — StrategyCallCTA renders before ContactForm in DOM order

### Task 1.4 — Tech stack doc update
- [ ] Add entry to `conductor/tech-stack.md`: no new deps, Calendly via external URL only

---

## Phase 2: Personalized Share Links (Feature 2)

### Task 2.1 — shares.ts data file
- [ ] Create `src/data/shares.ts` with `ShareEntry` interface and initial entries (3–5 example companies)
- [ ] Write test: `src/__tests__/shares.test.ts` — validates all entries have `company`, `message`, `accentLabel`; no empty strings

### Task 2.2 — ShareOverlay component (TDD)
- [ ] Write failing tests in `src/__tests__/ShareOverlay.test.tsx`:
  - Renders "TRANSMISSION INCOMING" mono label
  - Renders "A message for" prefix text
  - Renders company name in serif italic heading
  - Renders personalized message text
  - Renders "Enter the Portfolio" CTA button
  - Auto-dismiss calls `onDismiss` after timeout (mock `setTimeout`)
  - Manual button click calls `onDismiss` immediately
  - Renders progress bar element
  - Has `fixed inset-0 z-[200]` positioning classes
- [ ] Implement `src/components/ShareOverlay.tsx` (named export) to pass all tests
- [ ] Framer Motion `AnimatePresence` curtain exit: content fades (300ms) then overlay slides up (spring damping:25 stiffness:80)

### Task 2.3 — /for/[company] route
- [ ] Write failing tests in `src/__tests__/ForCompanyPage.test.tsx`:
  - Renders `ShareOverlay` with correct company data when slug matches `shares.ts`
  - Redirects to `/` when slug not found
  - `generateStaticParams()` returns all keys from `shares.ts`
- [ ] Create `src/app/for/[company]/page.tsx` with:
  - `generateStaticParams()` from `shares.ts`
  - Unknown slug → `redirect('/')`
  - Homepage rendered underneath, `ShareOverlay` on top via `AnimatePresence`

---

## Phase 3: "Ask Wenceslaus" AI Chat Widget (Feature 1)

### Task 3.1 — Tech stack doc update (BEFORE implementation)
- [ ] Add to `conductor/tech-stack.md`: `@anthropic-ai/sdk` — Claude API for chat widget server action

### Task 3.2 — Install dependency
- [ ] `npm install @anthropic-ai/sdk`
- [ ] Verify no peer dependency conflicts

### Task 3.3 — chatKnowledgeBase.ts
- [ ] Create `src/data/chatKnowledgeBase.ts`:
  - Imports from `projects.ts`, `career.ts`, `skills.ts`, `testimonials.ts`
  - Exports `buildSystemPrompt(): string` — compiles context into a single system prompt string
  - Exports `STARTER_QUESTIONS: string[]` — 3 curated openers
- [ ] Write test: `src/__tests__/chatKnowledgeBase.test.ts`:
  - `buildSystemPrompt()` includes project names from `projects.ts`
  - `buildSystemPrompt()` includes career milestones from `career.ts`
  - `buildSystemPrompt()` includes skill names from `skills.ts`
  - `STARTER_QUESTIONS` has exactly 3 items, all non-empty strings

### Task 3.4 — chat.ts Server Action (TDD)
- [ ] Write failing tests in `src/__tests__/chat.test.ts` (mock `@anthropic-ai/sdk`):
  - `sendMessage(messages)` returns a `ReadableStream`
  - Rejects when message count > 10 (rate limit enforcement server-side)
  - Includes system prompt from `buildSystemPrompt()`
  - Uses model `claude-sonnet-4-6`
- [ ] Implement `src/app/actions/chat.ts` (`'use server'`):
  - Validates message array length ≤ 10
  - Calls `anthropic.messages.stream()` with system prompt + messages
  - Returns streaming response
  - API key via `process.env.ANTHROPIC_API_KEY` (never exposed to client)

### Task 3.5 — ChatMessage component (TDD)
- [ ] Write failing tests in `src/__tests__/ChatMessage.test.tsx`:
  - Renders AI variant with left-aligned glass bubble
  - Renders user variant with right-aligned primary/20 bubble
  - Renders streaming cursor (`animate-pulse`) when `isStreaming` prop is true
  - Does not render cursor when `isStreaming` is false
- [ ] Implement `src/components/ChatMessage.tsx` (named export)

### Task 3.6 — AskWenceslaus widget (TDD)
- [ ] Write failing tests in `src/__tests__/AskWenceslaus.test.tsx`:
  - Renders closed orb button at fixed bottom-right
  - Button has accessible `aria-label="Ask Wenceslaus"`
  - Clicking button opens panel (panel visible in DOM)
  - Panel has `role="dialog"` and `aria-label="Neural Interface"`
  - ESC key closes panel
  - Renders 3 starter question chips before first message
  - Chips disappear after first message sent
  - Renders `ChatMessage` components for each message
  - Input submit calls `sendMessage` action (mocked)
  - Disables input while streaming
  - Shows message count limit warning at 8/10 messages
  - `sessionStorage` counter increments per message sent
- [ ] Implement `src/components/AskWenceslaus.tsx` (named export)
  - Client component (`'use client'`)
  - `useState` for open/closed, messages, streaming state
  - `sessionStorage` counter for rate limiting
  - Framer Motion: spring panel entrance, stagger chips

### Task 3.7 — Wire into layout
- [ ] Modify `src/app/layout.tsx`: mount `<AskWenceslaus />` inside `<body>` after all page content
- [ ] Write test update: `src/__tests__/layout.test.tsx` — AskWenceslaus present in layout

### Task 3.8 — Environment variable
- [ ] Add `ANTHROPIC_API_KEY` to `.env.local` (local dev)
- [ ] Document in `conductor/tech-stack.md`: required env var for chat feature

---

## Phase 4: Final Polish & Coverage

### Task 4.1 — Coverage audit
- [ ] Run `npx vitest run --coverage`
- [ ] Ensure all new files ≥ 80% coverage
- [ ] Fix any gaps

### Task 4.2 — Conductor checkpoint
- [ ] Manual verification: all 3 features work end-to-end in `npm run dev`
- [ ] Verify chat widget on mobile (bottom-right not clipped by safe areas)
- [ ] Verify share overlay auto-dismiss and manual dismiss
- [ ] Verify strategy CTA Calendly link opens in new tab
- [ ] Run `npm run build` — ensure no build errors
- [ ] Run `npm run lint` — no lint errors

### Task 4.3 — Track completion
- [ ] Mark track complete in `conductor/tracks.md`
- [ ] Archive track folder if all tasks done
