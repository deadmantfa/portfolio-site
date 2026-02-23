import { describe, it, expect } from 'vitest';
import { extractCVData } from '../utils/cv-data-extractor';

describe('CV Data Extraction Utility', () => {
  it('should extract personal information from product.md or constants', () => {
    const data = extractCVData();
    expect(data.personalInfo.name).toBe('Wenceslaus Dsilva');
    expect(data.personalInfo.title).toContain('Chief Technology Officer');
  });

  it('should extract the executive summary', () => {
    const data = extractCVData();
    expect(data.summary).toBeDefined();
    expect(data.summary.length).toBeGreaterThan(50);
  });

  it('should extract professional experience from careerData', () => {
    const data = extractCVData();
    expect(data.experience).toBeDefined();
    expect(data.experience.length).toBeGreaterThan(5);
    expect(data.experience[0].role).toBe('Chief Technology Officer');
  });

  it('should extract and categorize skills', () => {
    const data = extractCVData();
    expect(data.skills).toBeDefined();
    expect(data.skills.frontend).toBeDefined();
    expect(data.skills.backend).toBeDefined();
    expect(data.skills.infrastructure).toBeDefined();
    expect(data.skills.leadership).toBeDefined();
  });

  it('should extract high-impact core metrics', () => {
    const data = extractCVData();
    expect(data.metrics).toBeDefined();
    expect(data.metrics.length).toBeGreaterThanOrEqual(3);
    expect(data.metrics).toContainEqual(expect.objectContaining({ label: 'System Runtime', value: '-85%' }));
  });
});
