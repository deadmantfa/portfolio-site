const fs = require('fs');

try {
  const mobile = JSON.parse(fs.readFileSync('report-mobile.json', 'utf8'));
  const desktop = JSON.parse(fs.readFileSync('report-desktop.json', 'utf8'));

  function getMetrics(report) {
    const audits = report.audits;
    return {
      score: report.categories.performance.score * 100,
      LCP: audits['largest-contentful-paint'].displayValue,
      LCP_Numeric: audits['largest-contentful-paint'].numericValue,
      CLS: audits['cumulative-layout-shift'].displayValue,
      CLS_Numeric: audits['cumulative-layout-shift'].numericValue,
      TBT: audits['total-blocking-time'].displayValue,
      TBT_Numeric: audits['total-blocking-time'].numericValue,
      LCP_Element: audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet || 'N/A',
      CLS_Culprits: audits['layout-shifts']?.details?.items?.map(i => i.node?.snippet).slice(0, 3) || [],
    };
  }

  console.log('Mobile Metrics:', JSON.stringify(getMetrics(mobile), null, 2));
  console.log('Desktop Metrics:', JSON.stringify(getMetrics(desktop), null, 2));
} catch (e) {
  console.error(e);
}
