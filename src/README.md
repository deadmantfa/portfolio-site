# src

## Overview
Core application source tree containing the Next.js App Router routes, frontend presentation components, domain datasets, custom React hooks, styling helpers, and math/data utilities.

## Subdirectories & Boundaries
- [app](./app/README.md) - Next.js App Router root defining layout, global providers, root metadata, error/404 boundaries, homepage, and sub-routes (about, actions, api, contact, for, privacy, work).
- [components](./components/README.md) - Architectural frontend presentation layer implementing interactive 3D Three.js WebGL scenes, typography, animation choreography, global scroll synchronization, and advisory UI widgets.
- [data](./data/README.md) - Static domain datasets and configuration models powering the portfolio site (career milestones, case studies, skills, testimonials, repositories, and AI assistant prompts).
- [hooks](./hooks/README.md) - Custom React hooks providing scroll-driven dynamic favicon progress animation (`useFaviconProgress`).
- [lib](./lib/README.md) - Shared utility functions for class name composition and styling (`cn` via clsx and tailwind-merge).
- [utils](./utils/README.md) - Shared utility package providing CV data extraction, GitHub sync markdown formatters, 3D math layouts (helix and orbital ring positioning), and skill icon lookups.
