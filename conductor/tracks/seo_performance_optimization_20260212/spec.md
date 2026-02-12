# Specification: Global SEO & Performance Optimization

## Overview
This track ensures the portfolio is production-ready by optimizing for search engines and performance metrics. It focuses on achieving 100/100 Lighthouse scores and ranking for high-value leadership keywords ("CTO", "Software Architect", "Technical Leadership").

## Functional Requirements
- **Dynamic SEO Metadata**: Refine `generateMetadata` across all routes to include comprehensive OpenGraph, Twitter, and JSON-LD structured data.
- **Sitemap & Robots**: Automated generation of `sitemap.xml` and `robots.txt` including all dynamic project routes.
- **Accessibility Audit**: Final pass to ensure WCAG 2.1 compliance (contrast, labels, keyboard nav).
- **Core Web Vitals Tuning**: Optimize Three.js loading states and font delivery to minimize LCP and CLS.

## Non-Functional Requirements
- **Performance**: Target < 1s Largest Contentful Paint (LCP).
- **SEO**: Ensure all images have descriptive alt text and all pages have unique titles/descriptions.
- **Reliability**: 100% pass rate on build-time type checking and linting.

## Acceptance Criteria
- [ ] Lighthouse SEO score is 100.
- [ ] Lighthouse Accessibility score is 100.
- [ ] `sitemap.xml` correctly lists the home page and all project case studies.
- [ ] Structured data (JSON-LD) for a "Person" and "CreativeWork" is present.

## Out of Scope
- Backlink building or external marketing.
