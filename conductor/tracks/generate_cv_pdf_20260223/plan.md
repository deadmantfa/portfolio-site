# Implementation Plan: Generate Professional 1-Page CV PDF

## Phase 1: Setup & Data Preparation
- [x] Task: Install `@react-pdf/renderer` and `qrcode.react` (for the QR code). c67f7bd
- [ ] Task: Create a data-extraction utility to pull metrics and experience from `product.md` and portfolio data files.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup & Data Preparation' (Protocol in workflow.md)

## Phase 2: CV Component Design (React-PDF)
- [ ] Task: Implement the `CVDocument` base component with professional Dark Mode styling and premium typography.
- [ ] Task: Create modular sub-components for the Header (Name, Title, Contact), Summary, Core Metrics, and Experience.
- [ ] Task: Implement the "Interactive Bridge" section with a generated QR code and portfolio link.
- [ ] Task: Refine the layout to strictly adhere to the 1-page executive format.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: CV Component Design (React-PDF)' (Protocol in workflow.md)

## Phase 3: PDF Generation & Integration
- [ ] Task: Create a script/utility to generate the PDF file and save it to `public/CV/Wenceslaus-Dsilva-2026.pdf`.
- [ ] Task: Implement a downloadable button or link in the portfolio UI (e.g., in the Navigation or Footer).
- [ ] Task: Ensure the PDF generation is integrated into the build process or accessible via a dedicated route.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: PDF Generation & Integration' (Protocol in workflow.md)

## Phase 4: Final Polish & Verification
- [ ] Task: Conduct a final visual audit of the generated PDF (spacing, typography, alignment).
- [ ] Task: Verify PDF accessibility (screen reader tagging).
- [ ] Task: Perform a cross-device check of the download functionality.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Polish & Verification' (Protocol in workflow.md)
