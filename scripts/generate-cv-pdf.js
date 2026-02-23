#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1280,
      height: 1024,
      deviceScaleFactor: 2,
    });

    // Read the HTML file
    const htmlPath = path.join(__dirname, '../public/CV/Wenceslaus-Dsilva-2026-onesheet.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Set content directly (more reliable than file:// URLs)
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate PDF with background colors enabled
    const pdfPath = path.join(__dirname, '../public/CV/Wenceslaus-Dsilva-2026.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '0.3in',
        right: '0.3in',
        bottom: '0.3in',
        left: '0.3in',
      },
      printBackground: true,
      preferCSSPageSize: false,
      scale: 1.0,
    });

    await browser.close();

    console.log(`✓ PDF generated successfully: ${pdfPath}`);
    console.log(`✓ File size: ${(fs.statSync(pdfPath).size / 1024).toFixed(2)} KB`);

    // Delete the HTML file after PDF is generated
    fs.unlinkSync(htmlPath);
    console.log(`✓ HTML file removed: ${htmlPath}`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Error generating PDF:', error.message);
    process.exit(1);
  }
}

generatePDF();
