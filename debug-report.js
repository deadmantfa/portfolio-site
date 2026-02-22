const fs = require('fs');
try {
  const mobile = JSON.parse(fs.readFileSync('report-mobile.json', 'utf8'));
  console.log('Keys containing "largest":', Object.keys(mobile.audits).filter(k => k.includes('largest')));
  console.log('LCP Audit:', JSON.stringify(mobile.audits['largest-contentful-paint'], null, 2));
} catch (e) {
  console.error(e);
}
