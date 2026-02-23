import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
import { CVDocument } from '../src/components/CVDocument';
import { extractCVData } from '../src/utils/cv-data-extractor';

/**
 * Script to programmatically generate the professional executive CV PDF.
 * Uses @react-pdf/renderer for precise layout and consistent Dark Mode aesthetic.
 */
async function generate() {
  try {
    console.log('--- Initiating Executive CV Generation ---');
    
    // 1. Extract CV data from portfolio sources
    const data = extractCVData();
    console.log(`✓ Data extracted for: ${data.personalInfo.name}`);
    
    // 2. Generate high-resolution QR code for the Interactive Bridge
    // Links back to the deep-dive case studies on the live portfolio
    const qrCodeDataUri = await QRCode.toDataURL('https://w1d.pro', {
      margin: 1,
      width: 300,
      color: {
        dark: '#030712', // Slate 950
        light: '#ffffff',
      },
    });
    console.log('✓ QR Code generated for w1d.pro');

    // 3. Define output path
    const outputPath = path.resolve(process.cwd(), 'public/CV/Wenceslaus-Dsilva-2026.pdf');
    
    // 4. Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`✓ Created directory: ${outputDir}`);
    }

    // 5. Render the document to file
    console.log('--- Rendering PDF Document... ---');
    await ReactPDF.renderToFile(
      <CVDocument data={data} qrCode={qrCodeDataUri} />,
      outputPath
    );

    const fileSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
    console.log(`✓ CV PDF generated successfully at: ${outputPath}`);
    console.log(`✓ Final File Size: ${fileSize} KB`);
    console.log('--- Generation Complete ---');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ CRITICAL ERROR during PDF generation:', error);
    process.exit(1);
  }
}

generate();
