# Specification: Portfolio Performance & Accessibility Optimization

## Overview
This track pivots focus to critical performance and accessibility improvements. The primary goal is to elevate Google Lighthouse Performance scores from current levels (~44 mobile / ~66 desktop) to **> 95** and achieve a perfect **100** in Accessibility. We will leverage Next.js optimization features (Image, Font, Script) and best practices to reduce bundle size and blocking time.

## Functional Requirements
1.  **Performance Optimization (Core Web Vitals):**
    -   **Image Optimization:** Enforce strict usage of `next/image` with correct `sizes`, `priority` (for LCP candidates), and modern formats (WebP/AVIF).
    -   **Code Splitting:** Implement dynamic imports (`next/dynamic`) for heavy components (e.g., 3D scenes, complex charts) to reduce initial bundle size.
    -   **Font Optimization:** Verify `next/font` implementation to eliminate layout shifts (CLS) and ensure zero-blocking loading.
    -   **Third-Party Scripts:** Optimize loading of external scripts (e.g., analytics) using `next/script` strategies (`lazyOnload`, `worker`).

2.  **Accessibility Remediation:**
    -   **Audit & Fix:** Conduct a thorough accessibility audit to identify and fix contrast issues, missing ARIA labels, and semantic HTML structure.
    -   **Keyboard Navigation:** Ensure full keyboard navigability for all interactive elements.

3.  **Structured Data Implementation:**
    -   Implement **JSON-LD** schemas for `Person`, `WebSite`, and `CreativeWork` to enhance rich search results, complementing the existing high SEO score.

## Non-Functional Requirements
1.  **Performance Targets:**
    -   **Lighthouse Performance:** > 95 (Mobile & Desktop).
    -   **LCP (Largest Contentful Paint):** < 2.5s.
    -   **CLS (Cumulative Layout Shift):** < 0.1.
    -   **TBT (Total Blocking Time):** < 200ms.
2.  **Accessibility Target:**
    -   **Lighthouse Accessibility:** 100.

## Acceptance Criteria
-   [ ] Lighthouse Performance score is **> 95** on both mobile and desktop.
-   [ ] Lighthouse Accessibility score is **100**.
-   [ ] All images use `next/image` and are properly sized.
-   [ ] Heavy components are lazy-loaded.
-   [ ] Structured data validates correctly in Google Rich Results Test.