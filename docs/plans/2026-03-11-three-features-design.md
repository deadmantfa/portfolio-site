# Three New Features Design — 2026-03-11

## Context

Portfolio goal: Land a CTO/senior leadership role via direct link shares to CEOs, boards, and executive recruiters. These features are additive — the existing 3D scroll experience is unchanged.

---

## Feature 1: "Ask Wenceslaus" AI Chat Widget

### Purpose
An AI-powered chat widget that allows visitors to have a real conversation about Wenceslaus's experience, philosophy, and approach. Demonstrates AI leadership by doing, not just claiming.

### Visual Design
- **Closed state**: Fixed `bottom-6 right-6 z-50` — 56px `glass rounded-full` orb with a `MessageSquare` Lucide icon. Pulse ring (`animate-ping border-primary/40`) on hover only.
- **Open panel**: Slides up from button origin. `glass w-80 md:w-96 rounded-[2rem] max-h-[520px]` with:
  - Header: `font-mono text-[9px] uppercase tracking-[0.4em]` label "NEURAL INTERFACE" + close button
  - Messages area: scrollable, AI bubbles (`glass rounded-2xl rounded-tl-sm`) left-aligned, user bubbles (`bg-primary/20 border-primary/30 rounded-2xl rounded-tr-sm`) right-aligned
  - Starter chips (3): `glass rounded-full font-mono text-[9px] uppercase tracking-[0.2em] px-4 py-2`
  - Input: same `bg-white/5 border border-white/10 rounded-xl` pattern as ContactForm
  - Send: `size-10 rounded-full bg-primary/20 hover:bg-primary/40`

### Animation
- Panel: Framer Motion spring `damping: 20, stiffness: 90` from `opacity: 0, y: 20, scale: 0.95`
- Exit: reverse at 70% duration (exit faster than enter)
- Starter chips: 30ms stagger entrance
- Streaming: character-by-character via `@anthropic-ai/sdk` stream

### Architecture
- `src/app/actions/chat.ts` — Server Action, calls `claude-sonnet-4-6`, streaming, API key server-side only
- `src/components/AskWenceslaus.tsx` — widget shell, open/closed state
- `src/components/ChatMessage.tsx` — message bubble (AI vs user variant)
- `src/data/chatKnowledgeBase.ts` — compiled system prompt from `projects.ts`, `career.ts`, `skills.ts`
- Rate limit: 10 messages/session via `sessionStorage` counter
- Mounted globally in `src/app/layout.tsx` (outside scroll context)

### Key Tailwind Patterns
```
// Button (closed)
fixed bottom-6 right-6 z-50 glass size-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-150 active:scale-97

// Pulse ring
absolute inset-0 rounded-full border border-primary/40 animate-ping

// Panel
glass w-80 md:w-96 rounded-[2rem] flex flex-col overflow-hidden shadow-2xl

// AI message bubble
glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm font-sans text-foreground/80 max-w-[85%]

// User message bubble
bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-sans ml-auto max-w-[85%]
```

### UX Guidelines Applied
- Pulse animation only on hover (not continuous decorative animation)
- Exit animation ~70% of entrance duration
- `prefers-reduced-motion` respected via existing `globals.css`
- `aria-label` on all icon buttons, `aria-live="polite"` on message list
- Rate limiting prevents abuse

---

## Feature 2: Personalized Share Links (`/for/[company]`)

### Purpose
Wenceslaus generates a URL like `/for/stripe` to share directly with a specific company. The recipient sees a personalized cinematic overlay before the full portfolio reveals. Turns a cold link into a warm, intentional touch.

### Visual Design
**Fullscreen overlay** (`fixed inset-0 z-[200]`):
- Backdrop: `bg-background/95 backdrop-blur-sm` with `absolute inset-0 tech-grid opacity-10`
- Content (centered): staggered entrance with 120ms between elements:
  1. `font-mono text-[9px] uppercase tracking-[0.4em] text-primary/60` — "TRANSMISSION INCOMING"
  2. `font-sans text-sm text-foreground/40` — "A message for"
  3. `font-serif italic text-5xl md:text-7xl text-foreground` — Company name
  4. `border-t border-white/10 w-16 mx-auto` — thin divider rule
  5. `font-sans text-foreground/70 leading-relaxed max-w-sm text-center` — personalized message
  6. CTA button — existing pill style (`bg-primary text-black font-mono uppercase`)
  7. `h-px bg-primary/30` progress line with animated `bg-primary` fill over 8s

**Exit**: Content fades out (300ms), overlay slides up off-screen (spring `damping: 25, stiffness: 80`) revealing portfolio loaded underneath.

### Data Structure
```ts
// src/data/shares.ts
interface ShareEntry {
  company: string
  message: string
  accentLabel: string
}
export const shares: Record<string, ShareEntry> = {
  stripe: {
    company: 'Stripe',
    message: 'Wenceslaus built this specifically for your team — 20 years of engineering leadership, distilled.',
    accentLabel: 'TRANSMISSION INCOMING',
  },
}
```

### Architecture
- `src/app/for/[company]/page.tsx` — Next.js dynamic route, `generateStaticParams()` from `shares.ts`
- `src/components/ShareOverlay.tsx` — overlay with Framer Motion `AnimatePresence`
- Portfolio homepage rendered underneath, hidden until overlay exits
- Unknown `company` slug → redirect to `/` (no 404)
- `src/data/shares.ts` — single source of truth for all personalized entries

### Key Tailwind Patterns
```
// Backdrop
fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center

// Company name
font-serif italic text-5xl md:text-7xl text-foreground mb-6

// Progress bar track
h-px w-48 bg-primary/20 mt-8 overflow-hidden rounded-full

// Progress bar fill (animated width 0→100% over 8s)
h-full bg-primary rounded-full transition-all
```

### UX Guidelines Applied
- Auto-dismiss after 8s (not jarring — visitor has time to read)
- Manual "Enter the Portfolio" button for immediate access
- `prefers-reduced-motion`: shows content instantly, skips all animation
- Portfolio loads in parallel beneath overlay (no extra wait)

---

## Feature 3: Schedule a Strategy Call CTA

### Purpose
A section inserted directly above the existing `ContactForm` in the contact section. Provides a frictionless path from "impressed" to "booked" without email back-and-forth.

### Visual Design
**Outer container**: `glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden w-full max-w-5xl mb-8`
- `absolute inset-0 tech-grid opacity-5 pointer-events-none` overlay
- `grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10` inner grid

**Left column** (editorial):
- `font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40` — "DIRECT ENGAGEMENT"
- `font-serif italic text-3xl md:text-4xl text-foreground mb-4` — "Let's architect something significant."
- `font-sans text-foreground/70 leading-relaxed text-sm` — supporting copy about the 30-min conversation

**Right column** (action card): `glass rounded-[2rem] p-6 flex flex-col justify-between h-full`
- `font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40` — "AVAILABILITY"
- Availability indicator: `size-2 rounded-full bg-green-400 animate-pulse` (status dot, valid use of pulse) + "Open to conversations"
- `font-sans text-foreground/50 text-sm` — "Typically responds within 24 hours."
- CTA button: existing pill — `bg-primary text-black font-mono text-[11px] uppercase tracking-[0.4em] py-4 px-8 rounded-full hover:bg-foreground hover:text-background transition-all active:scale-[0.98]`
- `font-mono text-[9px] text-foreground/30` — "or scroll down to write"

### Architecture
- `src/data/contact.ts` — `calendlyUrl: string`, `availabilityStatus: 'open' | 'closed'`
- `src/components/StrategyCallCTA.tsx` — section component (named export)
- Inserted in contact section of `src/app/page.tsx` above `<ContactForm />`
- Calendly opens in new tab (`target="_blank" rel="noopener noreferrer"`) — no iframe, no third-party script weight

### Animation
- `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 20 }}` — identical to existing `ContactForm` pattern
- Left and right columns stagger 100ms apart
- No further animation — content-first

---

## New Files Summary

| File | Purpose |
|------|---------|
| `src/app/actions/chat.ts` | Server Action — Claude API streaming |
| `src/app/for/[company]/page.tsx` | Dynamic personalized share route |
| `src/components/AskWenceslaus.tsx` | Chat widget shell |
| `src/components/ChatMessage.tsx` | Message bubble component |
| `src/components/ShareOverlay.tsx` | Personalized overlay component |
| `src/components/StrategyCallCTA.tsx` | Strategy call CTA section |
| `src/data/chatKnowledgeBase.ts` | Compiled AI knowledge base |
| `src/data/shares.ts` | Personalized company entries |
| `src/data/contact.ts` | Calendly URL + availability status |

## New Dependencies

| Package | Reason |
|---------|--------|
| `@anthropic-ai/sdk` | Claude API for chat widget |

## Design System Compliance

- All components use existing `glass`, `tech-grid`, `scanline` utilities
- All colors reference existing `--color-*` tokens (no new variables)
- Typography follows: `font-serif italic` headings, `font-mono uppercase` labels, `font-sans` body
- Border radius follows `rounded-[2rem]` / `rounded-[2.5rem]` pattern
- Animations: Framer Motion spring `damping: 20, stiffness: 90`; micro-interactions 150–300ms ease-out
- `prefers-reduced-motion` respected via existing `globals.css` rule
- Named exports only, no `any`, `const` by default
