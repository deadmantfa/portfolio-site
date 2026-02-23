#!/usr/bin/env node

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Portfolio colors (RGB)
const COLORS = {
  primary: [99, 102, 241], // #6366f1 indigo
  accent: [245, 158, 11], // #f59e0b amber
  teal: [20, 184, 166], // #14b8a6 teal
  text: [26, 26, 26], // #1a1a1a dark text
  muted: [120, 120, 120], // #787878 muted text
  border: [200, 200, 200], // light border
};

const doc = new PDFDocument({
  size: 'A4',
  margin: 20,
});

const pdfPath = path.join(__dirname, '../public/CV/Wenceslaus-Dsilva-2026.pdf');
const writeStream = fs.createWriteStream(pdfPath);
doc.pipe(writeStream);

// White background
doc.rect(0, 0, 595, 842).fill([255, 255, 255]);

let y = 30;
const leftMargin = 30;
const pageWidth = 595 - 60; // accounting for margins

// ============ HELPERS ============
function heading(text, size = 24, color = COLORS.primary) {
  doc.fontSize(size).fillColor(...color).font('Helvetica-Bold');
  doc.text(text, leftMargin, y, { width: pageWidth });
  y = doc.y + 6;
}

function subheading(text, size = 11, color = COLORS.primary) {
  doc.fontSize(size).fillColor(...color).font('Helvetica-Bold');
  doc.text(text, leftMargin, y, { width: pageWidth });
  y = doc.y + 4;
}

function body(text, size = 10, color = COLORS.text, options = {}) {
  doc.fontSize(size).fillColor(...color).font('Helvetica');
  const opts = { width: pageWidth, ...options };
  doc.text(text, leftMargin, y, opts);
  y = doc.y + 2;
}

function spacer(height = 8) {
  y += height;
}

function line(color = COLORS.border, thickness = 1) {
  doc.strokeColor(...color).lineWidth(thickness);
  doc.moveTo(leftMargin, y).lineTo(595 - leftMargin, y).stroke();
  y += 8;
}

// ============ HEADER ============
heading('Wenceslaus Dsilva', 28, COLORS.primary);
y -= 8;

doc.fontSize(12).fillColor(...COLORS.text).font('Helvetica');
doc.text('CTO & Technical Architect', leftMargin, y);
y = doc.y + 2;

doc.fontSize(9).fillColor(...COLORS.muted);
doc.text(
  '📍 Mumbai, India  |  📞 +91 766 618 0904  |  📧 wenceslausdsilva+cv@gmail.com  |  🌐 w1d.pro',
  leftMargin,
  y
);
y = doc.y + 6;

line(COLORS.primary, 2);

// ============ HEADLINE ============
doc.fontSize(11).fillColor(...COLORS.accent).font('Helvetica-Bold');
doc.text('Technical visionary architecting scale, building teams, driving impact', leftMargin, y, {
  width: pageWidth,
});
y = doc.y + 8;

// ============ WHAT I DO ============
doc.fontSize(10).fillColor(...COLORS.primary).font('Helvetica-Bold').text('What I Do:', leftMargin, y);
y = doc.y + 2;
body('Architect serverless platforms • Build high-performance teams • Optimize cloud infrastructure', 10, COLORS.text);
spacer(6);

// ============ TESTIMONIAL ============
doc.rect(leftMargin, y, pageWidth, 40).stroke(...COLORS.teal);
y += 4;
doc.fontSize(9).fillColor(...COLORS.text).font('Helvetica-Oblique');
doc.text(
  '"Strategic thinker who stays ahead of technology trends while building exceptionally strong teams."',
  leftMargin + 8,
  y,
  { width: pageWidth - 16 }
);
doc.fontSize(8).fillColor(...COLORS.teal).font('Helvetica-Bold');
y = doc.y + 1;
doc.text('— Kavan Antani, CEO & Forbes 30u30 Asia', leftMargin + 8, y);
y = doc.y + 10;

// ============ METRICS ============
doc.fontSize(11).fillColor(...COLORS.accent).font('Helvetica-Bold').text('Key Impact Metrics', leftMargin, y);
y = doc.y + 8;

const metrics = [
  { val: '85%', label: 'Runtime Reduction' },
  { val: '$50M+', label: 'Transactions' },
  { val: '100%', label: 'Uptime (3yr)' },
  { val: '20+', label: 'Years' },
  { val: '100K+', label: 'Users' },
  { val: '10K+', label: 'DAU (3x Growth)' },
];

const mWidth = 90;
const mGap = 6;
let mX = leftMargin;
let mY = y;

metrics.forEach((m, idx) => {
  if (idx === 3) {
    mY += 70;
    mX = leftMargin;
  }

  // Box border
  doc.rect(mX, mY, mWidth, 60).stroke(...COLORS.accent);

  // Value
  doc.fontSize(14).fillColor(...COLORS.accent).font('Helvetica-Bold');
  doc.text(m.val, mX, mY + 12, { width: mWidth, align: 'center' });

  // Label
  doc.fontSize(8).fillColor(...COLORS.muted).font('Helvetica');
  doc.text(m.label, mX, mY + 36, { width: mWidth, align: 'center' });

  mX += mWidth + mGap;
});

y = mY + 70;
spacer(2);

// ============ SPECIALIZATIONS ============
doc.fontSize(11).fillColor(...COLORS.accent).font('Helvetica-Bold').text('Specializations', leftMargin, y);
y = doc.y + 2;
body('Cost Optimization • Reliability Engineering at Scale • Serverless Transformation • AI-First Architecture', 10, COLORS.text);
spacer(6);

// ============ CURRENT IMPACT ============
doc.rect(leftMargin, y, pageWidth, 50).stroke(...COLORS.primary);
y += 4;
doc.fontSize(10).fillColor(...COLORS.primary).font('Helvetica-Bold');
doc.text('Current Impact: Rooftop (2022–Now)', leftMargin + 8, y, { width: pageWidth - 16 });
y = doc.y + 3;
doc.fontSize(9).fillColor(...COLORS.text).font('Helvetica');
doc.text(
  'Directing technology strategy during 3–5x yearly growth. Architected serverless transformation reducing runtime 85% and cloud costs 40% YoY. Implementing AI-driven personalization; maintaining 99.9% SLA.',
  leftMargin + 8,
  y,
  { width: pageWidth - 16 }
);
y = doc.y + 10;

// ============ EXPERIENCE ============
doc.fontSize(11).fillColor(...COLORS.teal).font('Helvetica-Bold').text('Experience', leftMargin, y);
y = doc.y + 6;

const roles = [
  {
    title: 'CTO @ Rooftop',
    dates: '2022–Now',
    desc: 'Directed 85% runtime reduction via serverless transformation during 3–5x yearly growth. Implemented AI-driven personalization; maintaining 99.9% SLA.',
  },
  {
    title: 'CTO @ Food Darzee',
    dates: '2019–21',
    desc: 'Scaled 1K→10K+ daily users while improving ops efficiency 75% via custom ERP. Coordinated multi-team product expansion.',
  },
  {
    title: 'CTO @ IndieFolio Network',
    dates: '2015–18',
    desc: 'Maintained 100% uptime across 3 years scaling 10K→100K+ creatives. Pioneered color-based discovery.',
  },
];

roles.forEach((role) => {
  doc.fontSize(10).fillColor(...COLORS.primary).font('Helvetica-Bold');
  doc.text(role.title, leftMargin, y);
  doc.fontSize(8).fillColor(...COLORS.muted);
  doc.text(role.dates, 450, y - 10);
  y = doc.y + 2;

  body(role.desc, 9, COLORS.text);
  spacer(3);
});

// ============ COMPETENCIES ============
doc.fontSize(11).fillColor(...COLORS.teal).font('Helvetica-Bold').text('Core Competencies', leftMargin, y);
y = doc.y + 6;

const skills = [
  { cat: 'Leadership', list: 'Team Building • AI Strategy • Design Thinking • Critical Thinking' },
  { cat: 'Frontend', list: 'React • Next.js • Three.js • Angular • Flutter' },
  { cat: 'Backend', list: 'Node.js • TypeScript • PHP • Python • WebSockets • Yii' },
  { cat: 'Infrastructure', list: 'AWS • Serverless • Docker • Kubernetes • SageMaker • PostgreSQL' },
];

skills.forEach((skill) => {
  doc.fontSize(9).fillColor(...COLORS.teal).font('Helvetica-Bold');
  doc.text(skill.cat.toUpperCase(), leftMargin, y);
  y = doc.y + 2;

  body(skill.list, 9, COLORS.text);
  spacer(2);
});

// Finalize
doc.end();

writeStream.on('finish', () => {
  const fileSize = (fs.statSync(pdfPath).size / 1024).toFixed(2);
  console.log(`✓ PDF generated: ${pdfPath}`);
  console.log(`✓ File size: ${fileSize} KB`);
  console.log(`✓ PDF is NOW READABLE with white background and dark text`);
  process.exit(0);
});

writeStream.on('error', (error) => {
  console.error('✗ Error:', error.message);
  process.exit(1);
});
