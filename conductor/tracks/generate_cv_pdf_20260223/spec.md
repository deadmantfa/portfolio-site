# Specification: Generate Professional 1-Page CV PDF

## Overview
Generate a high-impact, professional 1-page CV PDF for Wenceslaus Dsilva. The CV will serve as a downloadable "Architectural Authority" document for tech recruiters and hiring managers, aligning with the portfolio's design language and executive leadership positioning.

## User Persona
- **Tech Recruiters and Hiring Managers:** Looking for seasoned CTO-level leadership with deep technical roots and proven strategic impact.

## Functional Requirements
1. **1-Page Constraint:** Condense 20+ years of experience into a single, high-density, high-impact page.
2. **Executive Narrative:** Prioritize strategic leadership, team scaling, cost optimization (e.g., 40% cloud reduction), and ROI.
3. **Professional Dark Mode:** Maintain the portfolio's "Dark Mode" aesthetic (sophisticated, modern) in the PDF layout.
4. **Automated Generation:** Use `@react-pdf/renderer` to programmatically generate the PDF from portfolio data sources.
5. **Interactive Bridge:** Include a QR code and/or shortened URL (e.g., `w1d.pro/deep-dives`) to link back to the immersive portfolio sections.
6. **Data Integration:** Pull core content from `product.md`, existing CV metrics, and `additional.md`.

## Non-Functional Requirements
1. **Design Alignment:** Use premium typography (similar to Cormorant Garamond / JetBrains Mono) and "blueprint" visual accents.
2. **Precision Layout:** Ensure pixel-perfect alignment and professional spacing.
3. **Accessibility:** Ensure the generated PDF is tagged for screen readers.

## Acceptance Criteria
- [ ] A 1-page CV PDF is generated successfully.
- [ ] The design follows a professional "Dark Mode" aesthetic.
- [ ] The narrative focuses on "Executive Leadership" and high-level strategy.
- [ ] A QR code/link to the portfolio's deep-dives is clearly visible.
- [ ] The PDF is downloadable via the portfolio interface.

## Out of Scope
- Detailed project-by-project breakdowns (these are handled by the portfolio's interactive sections).
- Support for multiple CV variations (e.g., specialized "Frontend" vs. "Backend" versions).
