# Technology Stack - Wenceslaus Dsilva Portfolio

## Frontend Framework
- **Next.js (App Router):** Leveraging React for server-side rendering (SSR) and static site generation (SSG) to ensure peak SEO performance and fast initial load times.
- **TypeScript:** For robust, type-safe development across the entire codebase.

## Styling & UI
- **Tailwind CSS:** For rapid, utility-first styling and a highly responsive design system.
- **Google Fonts:** Integration of Cormorant Garamond and JetBrains Mono for a premium executive aesthetic.
- **Lucide React:** For a consistent, modern icon set.

## 3D & Animation
- **Three.js:** Powering a custom morphing architectural lattice and vertical node transitions.
- **React Three Fiber (R3F):** A declarative wrapper for Three.js that integrates seamlessly with React.
- **OrbitalSkillMap:** A responsive orbital ring system for skills visualization with concentric rings per category and GSAP-powered tilt entrance animations.
- **Connection Scene:** A final Three.js visualization ("Data Core") providing a unique backdrop for the contact experience.
- **React Three Drei:** A collection of high-quality helpers for R3F to accelerate 3D development.
- **Blueprint Engine:** A custom dynamic 3D schema visualizer built with Three.js and React Three Drei helpers (`Sphere`, `Line`, `Text`) to render architectural blueprints.
- **GSAP:** Ring-tilt entrance animation with expo.out easing. Pattern: plain JS ref tweened by GSAP, read by R3F useFrame each frame.
- **Framer Motion:** Powering shared layout transitions and high-end technical overlays (Blueprint Mode).

## Deployment & Hosting (\ Cost)
- **Vercel (Hobby Plan):** Providing \ hosting for personal projects with global CDN, automatic SSL, and specialized optimizations for Next.js.

## Content & Assets
- **Local Markdown/PDF:** Utilizing the provided \WenceslausDsilva-CV-2026.pdf\ and \additional.md\ as the primary data sources.
- **Sharp:** For high-performance image optimization to boost SEO scores.
- **Next.js Metadata & SEO:** Dynamic sitemap generation, robots.txt, and automated professional JSON-LD structured data.
- **Optimized Typography:** Zero-CLS font delivery using `next/font/google`.

