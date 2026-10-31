# Components

## Overview
Architectural frontend presentation layer for the portfolio site, implementing interactive 3D WebGL scenes (via React Three Fiber and Three.js), editorial typography, GSAP and Framer Motion animation choreography, global scroll synchronization, and interactive UI widgets.

## Interface
- [./ui/README.md](./ui/README.md): Reusable foundational UI design system primitives (Button, Input, Textarea).
- [ADRCard.tsx:ADRCard]: Architectural decision record display card for case studies.
- [ArchitecturalLoader.tsx:ArchitecturalLoader]: Initial page loading screen with progress bar and fail-safe timeout.
- [ArchitecturalScroll.tsx:ArchitecturalScroll]: Custom fixed desktop scroll tracking rail and crosshair velocity indicator.
- [AskWenceslaus.tsx:AskWenceslaus]: Interactive streaming AI architectural advisory chat widget.
- [AssemblyScene.tsx:AssemblyScene]: 3D Three.js scene rendering floating serverless architecture blocks during scroll transitions.
- [BackgroundMarkers.tsx:BackgroundMarkers]: Background timeline year markers synchronized to viewport scroll progress.
- [BlueprintOverlay.tsx:BlueprintOverlay]: Case study 2D blueprint overlay showing architectural schemas and technical specifications.
- [BlueprintSchema.tsx:BlueprintSchema]: 3D network schema diagram rendering architecture nodes and connecting lines.
- [CVDocument.tsx:CVDocument]: Executive PDF resume document definition rendered via `@react-pdf/renderer`.
- [ChatMessage.tsx:ChatMessage]: Individual message bubble component supporting streaming cursor and role attribution.
- [ConnectionScene.tsx:ConnectionScene]: 3D pulsing connection rings Three.js scene.
- [ContactForm.tsx:ContactForm]: Contact transmission form with state machine and Server Action dispatch.
- [EditorialReveal.tsx:EditorialReveal]: Framer Motion scroll reveal wrapper component.
- [HighlightedParagraph.tsx:HighlightedParagraph]: Text parser and renderer highlighting quantifiable technical metrics and statistics.
- [HomeScene.tsx:HomeScene]: Unified 3D home scene orchestrator managing multiple Three.js sub-scenes across scroll progress.
- [Navigation.tsx:Navigation]: Header navigation bar with section tracking, glitch decode logo animation, and mobile controls.
- [OpenSourceShowcase.tsx:OpenSourceShowcase]: Open source repository showcase grid with GitHub metrics.
- [OrbitalNode.tsx:OrbitalNode]: Interactive 3D skill node rendered within orbital planes.
- [OrbitalRing.tsx:OrbitalRing]: 3D elliptical orbit trajectory line mesh.
- [OrbitalSkillMap.tsx:OrbitalSkillMap]: 3D interactive orbital planetary system visualizing technical capabilities.
- [ProfileGlitch.tsx:ProfileGlitch]: Profile image component with random or hover-driven GSAP glitch and scanline effects.
- [ProjectCaseStudyClient.tsx:ProjectCaseStudyClient]: Interactive case study page layout with blueprint toggle mode.
- [PullQuote.tsx:PullQuote]: Editorial typographic pull quote component.
- [SceneCanvas.tsx:SceneCanvas]: Base React Three Fiber Canvas container configured with default lighting and camera settings.
- [ScrollProvider.tsx:ScrollContext]: React context object managing scroll progress, active epoch, and selected skills.
- [ScrollProvider.tsx:ScrollContextType]: Type definition for scroll context state and setters.
- [ScrollProvider.tsx:ScrollProvider]: Context provider calculating continuous document scroll progress and active epoch boundaries.
- [ScrollProvider.tsx:useScroll]: Custom hook providing access to `ScrollContextType`.
- [ShareOverlay.tsx:ShareOverlay]: Social share card overlay modal with auto-dismiss countdown timer.
- [ShareOverlayWrapper.tsx:ShareOverlayWrapper]: Dynamic client-side wrapper handling `ShareOverlay` state.
- [SkillBackdrop.tsx:SkillBackdrop]: Background 3D particle mesh for the skill section.
- [SkillCard.tsx:SkillCard]: 2D interactive skill card with category badge and modal launcher.
- [SkillModal.tsx:SkillModal]: Detailed dialog modal showing architectural context and depth for a selected skill.
- [SkillModule.tsx:SkillModuleComponent]: 3D skill card mesh rendered inside the Three.js viewport.
- [SkillNebula.tsx:SkillNebula]: 3D particle nebula cloud visualization for skill categories.
- [SkillResourceProvider.tsx:SkillResourceProvider]: React context provider sharing reusable Three.js geometries across skill components.
- [SkillResourceProvider.tsx:useSkillResources]: Hook accessing shared Three.js geometry resources.
- [SkillTooltip.tsx:SkillTooltip]: Floating 2D tooltip positioned over active skill nodes.
- [SkillsGrid.tsx:SkillsGrid]: Accessible 2D grid view with category filters and search for skills.
- [SocialLinks.tsx:SocialLinks]: Social network link list with accessible labels and iconography.
- [StrategyCallCTA.tsx:StrategyCallCTA]: Call-to-action banner integrating Cal.com strategy consultation booking.
- [StructuredData.tsx:StructuredData]: JSON-LD structured metadata scripts for Person, WebSite, and ProfilePage schemas.
- [TestimonialsCarousel.tsx:TestimonialsCarousel]: Auto-rotating carousel displaying leadership recommendations.
- [TestimonialsSection.tsx:TestimonialsSection]: Testimonials container component managing carousel layout.
- [Timeline.tsx:Timeline]: 3D career epoch timeline with interactive navigable milestones.
- [VaultScene.tsx:VaultScene]: 3D credential vault scene with GLSL shader artifacts.
- [VisionaryScene.tsx:ArchitecturalGrid]: 3D perspective grid plane with stage materialization effects.

## Invariants
- [ScrollProvider.tsx:useScroll]: Throws `Error('useScroll must be used within a ScrollProvider')` if invoked outside a `ScrollProvider`.
- [SkillResourceProvider.tsx:useSkillResources]: Throws `Error('useSkillResources must be used within a SkillResourceProvider')` if invoked outside a `SkillResourceProvider`.
- [AskWenceslaus.tsx:AskWenceslaus]: Caps user session queries to 10 messages (`MAX_MESSAGES = 10`), tracked in `sessionStorage['ask_wenceslaus_count']`. Prevents sending when streaming is active or query is whitespace-only.
- [ContactForm.tsx:ContactForm]: Form submission state follows monotonic lifecycle `idle` -> `submitting` -> `success` | `error`. Success screen enforces explicit reset to re-enable submission.
- [ShareOverlay.tsx:ShareOverlay]: Automatically dismisses after 8000ms (`AUTO_DISMISS_MS = 8000`) unless dismissed earlier via user interaction or Escape key.
- [StructuredData.tsx:StructuredData]: Serializes JSON-LD via `safeJsonLd`, replacing `<` and `>` with `\u003c` and `\u003e` to prevent script breakout.
- [ArchitecturalLoader.tsx:ArchitecturalLoader]: Forces finish via a 1500ms timeout fail-safe regardless of Drei asset loading progress.
- [Navigation.tsx:Navigation]: Bypasses hover text decode scrambler when `prefers-reduced-motion: reduce` is active.
- [SkillModal.tsx:SkillModal]: Closes active modal on Escape key press via window keyboard listener.

## Side Effects
- [AskWenceslaus.tsx:AskWenceslaus]: Initiates HTTP POST requests to `/api/chat` and reads response stream; mutates `sessionStorage['ask_wenceslaus_count']`.
- [ContactForm.tsx:ContactForm]: Invokes Next.js Server Action `sendEmail` transmitting email data to server backend.
- [StrategyCallCTA.tsx:StrategyCallCTA]: Asynchronously loads external Cal.com embed API (`getCalApi`) to render booking widget.
- [Navigation.tsx:Navigation]: Attaches `IntersectionObserver` to sections `#hero`, `#epochs`, `#skills`, `#lab`, `#signals`, `#contact`; dispatches GSAP timeline and timer intervals on logo hover.
- [ScrollProvider.tsx:ScrollProvider]: Adds passive `scroll` event listener to `window`; queries `#epochs` and its sections via DOM APIs.
- [ArchitecturalScroll.tsx:ArchitecturalScroll]: Creates GSAP `ScrollTrigger` bound to `body` scroll progress.
- [ProfileGlitch.tsx:ProfileGlitch]: Injects `<style id="glitch-scanline-style">` into `document.head`; runs timer intervals for random glitch animations.
- [ShareOverlay.tsx:ShareOverlay]: Schedules `setTimeout` and `setInterval` for automatic dismiss countdown.
- [ArchitecturalLoader.tsx:ArchitecturalLoader]: Schedules `setInterval` for progress simulation and `setTimeout` fail-safe.
- [TestimonialsCarousel.tsx:TestimonialsCarousel]: Schedules timer interval for automatic slide rotation.
- [SkillModal.tsx:SkillModal]: Attaches `keydown` event listener to `window` for Escape key handling.

## Verification
- Run: `npm test`
