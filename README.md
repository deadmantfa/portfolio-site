# Portfolio Site Blueprint

## System Overview
Interactive executive engineering portfolio and architectural showcase built with Next.js 16 App Router, React 19, React Three Fiber (Three.js), GSAP, and Tailwind CSS v4. The system provides real-time 3D interactive visualizations, dynamic scroll-linked career epochs, server-side rendered case studies with OpenGraph/Schema.org metadata, server action inquiry delivery via Resend, and an AI conversational assistant with automated multi-provider failover.

## Local Interface & Invariants
- `[proxy.ts:proxy]` - Edge middleware handling cryptographic CSP nonces, Content Security Policy headers, Referrer-Policy, HSTS, frame isolation, and route path matching.
- `[next.config.ts:nextConfig]` - Next.js application configuration enabling React Compiler, production browser source maps, Bundle Analyzer integration, and response header security policies.

## Subdirectories & System Boundaries
- [scripts](./scripts/README.md) - Automated build, document generation, and profile synchronization scripts supporting the portfolio site, including PDF CV generation and GitHub profile sync.
- [src](./src/README.md) - Core application source tree containing the Next.js App Router routes, frontend presentation components, domain datasets, custom React hooks, styling helpers, and math/data utilities.

## Global Invariants
- **Scroll & State Synchronization**: `ScrollProvider` serves as the single source of truth for viewport progress (0–1), active career epoch, and selected skills without mutating server state.
- **Defense-in-Depth Header Policies**: Enforces strict CSP with explicit `worker-src blob:` allowances for Troika 3D font rasterization workers and `object-src 'none'`.
- **Fault-Tolerant Conversational Assistant**: `/api/chat` enforces a session-bound 10-message rate limit and hierarchical provider fallback (`claude-sonnet-4-6` -> `gemini-3.1-flash-lite-preview` -> `gemini-2.5-pro`).
- **Domain-Driven Content**: All dynamic routes (`/work/[slug]`, `/for/[company]`) and 3D scenes validate against and project from static data models in `src/data/`.

## Global Side Effects
- **External Email Delivery**: Next.js Server Action (`sendEmail`) issues outbound HTTPS requests to the Resend API to deliver contact inquiries.
- **External AI Assistant Streaming**: `/api/chat` dispatches outbound HTTPS requests to Anthropic and Google Gemini APIs.
- **Client DOM & Storage Mutations**: `AskWenceslaus` writes session counters to browser `sessionStorage`; `useFaviconProgress` replaces `<link rel="icon">` in `document.head` with canvas data URLs.
- **Build-Time PDF Generation**: Scripts in `scripts/` render and write binary PDF files to `public/CV/`.

## System Verification
- Run: `npm test`
