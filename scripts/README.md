# scripts

## Overview
Automated build, document generation, and profile synchronization scripts supporting the portfolio site. These utilities handle PDF generation of the executive curriculum vitae using Puppeteer, PDFKit, and @react-pdf/renderer, as well as compiling structured portfolio data into GitHub profile README documentation.

## Interface
- `[scripts/generate-cv-pdf.js:generatePDF]`: Puppeteer-based headless browser automation script that renders `public/CV/Wenceslaus-Dsilva-2026-onesheet.html` into `public/CV/Wenceslaus-Dsilva-2026.pdf` and removes the source HTML file.
- `[scripts/generate-cv-pdfkit.js:COLORS]`: Color palette mapping RGB triplet constants (`primary`, `accent`, `teal`, `text`, `muted`, `border`) used for PDFKit canvas styling.
- `[scripts/generate-cv-pdfkit.js:heading]`: Layout helper rendering primary section headings in Helvetica-Bold at specified font size and color.
- `[scripts/generate-cv-pdfkit.js:subheading]`: Layout helper rendering subheadings in Helvetica-Bold.
- `[scripts/generate-cv-pdfkit.js:body]`: Layout helper rendering text blocks in Helvetica with auto-wrapping.
- `[scripts/generate-cv-pdfkit.js:spacer]`: Vertical spacing helper advancing document vertical cursor offset.
- `[scripts/generate-cv-pdfkit.js:line]`: Divider rendering helper drawing horizontal borders across the printable page area.
- `[scripts/generate-cv-pdf.tsx:generate]`: Programmatic CV PDF generation workflow using `@react-pdf/renderer`, extracting portfolio data via `extractCVData` and rendering `CVDocument` to `public/CV/Wenceslaus-Dsilva-generated.pdf`.
- `[scripts/sync-github-profile.ts:generateREADME]`: GitHub profile synchronization utility mapping portfolio career, project, and skill definitions into formatted markdown for GitHub README presentation.

## Invariants
- `[scripts/generate-cv-pdf.js:generatePDF]`: Requires pre-existing HTML source file at `public/CV/Wenceslaus-Dsilva-2026-onesheet.html` before execution.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Launches Puppeteer Chromium browser with flags `['--no-sandbox', '--disable-setuid-sandbox']` and headless mode `'new'`.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Hardcodes viewport dimensions to 1280x1024 with `deviceScaleFactor: 2`.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Waits for `networkidle0` event with a 30000ms timeout before initiating a 3000ms font-settling delay.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Enforces A4 page format with uniform 0.3-inch margins, `printBackground: true`, and scale `1.0`.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Terminates execution via `process.exit(0)` on success or `process.exit(1)` upon error.
- `[scripts/generate-cv-pdfkit.js:doc]`: Targets standard A4 dimensions (595x842 points) with 20pt document margins and 535pt printable width.
- `[scripts/generate-cv-pdfkit.js:COLORS]`: RGB triplets are specified as 3-element arrays clamped to integer color channel ranges [0-255].
- `[scripts/generate-cv-pdfkit.js:heading]`: Mutates global vertical coordinate `y` monotonically downward to `doc.y + 6`.
- `[scripts/generate-cv-pdfkit.js:subheading]`: Mutates global vertical coordinate `y` monotonically downward to `doc.y + 4`.
- `[scripts/generate-cv-pdfkit.js:body]`: Mutates global vertical coordinate `y` monotonically downward to `doc.y + 2`.
- `[scripts/generate-cv-pdfkit.js:spacer]`: Advances vertical coordinate `y` by specified height (defaulting to 8pt).
- `[scripts/generate-cv-pdfkit.js:line]`: Strokes horizontal line from `leftMargin` (30pt) to `595 - leftMargin` (565pt) and advances `y` by 8pt.
- `[scripts/generate-cv-pdf.tsx:generate]`: Requires `extractCVData()` to produce a valid schema with a non-empty `personalInfo.name`.
- `[scripts/generate-cv-pdf.tsx:generate]`: Generates QR code targeting exact canonical URL `https://w1d.pro`.
- `[scripts/generate-cv-pdf.tsx:generate]`: Ensures parent output directory (`public/CV`) exists using recursive directory creation before writing PDF.
- `[scripts/generate-cv-pdf.tsx:generate]`: Writes output to absolute path resolved from `public/CV/Wenceslaus-Dsilva-generated.pdf`.
- `[scripts/generate-cv-pdf.tsx:generate]`: Terminates process via `process.exit(0)` on success or `process.exit(1)` on error.
- `[scripts/sync-github-profile.ts:generateREADME]`: Formats markdown string interpolating mapped career, projects, and skills sections alongside hardcoded social, stat, and trophy widgets.
- `[scripts/sync-github-profile.ts:generateREADME]`: Resolves output destination to `process.argv[2]` if provided, or defaults to `../../deadmantfa/README.md`.

## Side Effects
- `[scripts/generate-cv-pdf.js:generatePDF]`: Spawns and closes a headless Chromium process.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Reads `public/CV/Wenceslaus-Dsilva-2026-onesheet.html` from the filesystem via `fs.readFileSync`.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Writes generated PDF file to `public/CV/Wenceslaus-Dsilva-2026.pdf`.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Deletes `public/CV/Wenceslaus-Dsilva-2026-onesheet.html` via `fs.unlinkSync`.
- `[scripts/generate-cv-pdf.js:generatePDF]`: Terminates Node process via `process.exit`.
- `[scripts/generate-cv-pdfkit.js:writeStream]`: Writes binary PDF stream to `public/CV/Wenceslaus-Dsilva-2026.pdf`.
- `[scripts/generate-cv-pdfkit.js:writeStream]`: Terminates Node process via `process.exit`.
- `[scripts/generate-cv-pdf.tsx:generate]`: Reads structured portfolio data via `extractCVData()`.
- `[scripts/generate-cv-pdf.tsx:generate]`: Creates directory `public/CV` via `fs.mkdirSync` if missing.
- `[scripts/generate-cv-pdf.tsx:generate]`: Renders and writes PDF binary output to `public/CV/Wenceslaus-Dsilva-generated.pdf` via `ReactPDF.renderToFile`.
- `[scripts/generate-cv-pdf.tsx:generate]`: Terminates Node process via `process.exit`.
- `[scripts/sync-github-profile.ts:generateREADME]`: Writes generated markdown string to disk at `process.argv[2]` or `../../deadmantfa/README.md` via `fs.writeFileSync`.

## Verification
- Run: `npm test`
