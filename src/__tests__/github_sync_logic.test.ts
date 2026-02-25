import { describe, it, expect } from 'vitest';
import { mapCareerToMarkdown, mapProjectsToMarkdown, mapSkillsToMarkdown } from '../utils/github-sync-utils';

describe('GitHub Profile Sync Logic', () => {
  it('should map career data to a markdown list', () => {
    const mockCareer = [
      {
        year: '2022 - Present',
        role: 'Chief Technology Officer',
        company: 'Rooftop',
        description: 'Directed technology strategy.',
        highlights: ['Highlight 1']
      }
    ];
    // This is a placeholder for the logic we will implement
    const result = mapCareerToMarkdown(mockCareer);
    expect(result).toContain('### Rooftop');
    expect(result).toContain('**Chief Technology Officer** (2022 - Present)');
  });

  it('should map project data to a markdown list', () => {
    const mockProjects = [
      {
        title: 'Project Alpha',
        company: 'Company A',
        period: '2023',
        impact: 'Big impact.',
        techStack: ['React', 'TypeScript']
      }
    ];
    const result = mapProjectsToMarkdown(mockProjects);
    expect(result).toContain('### Project Alpha');
    expect(result).toContain('**Impact:** Big impact.');
    expect(result).toContain('`React` `TypeScript`');
  });

  it('should map skills to a markdown list with icons', () => {
    const mockSkills = [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' }
    ];
    const result = mapSkillsToMarkdown(mockSkills);
    expect(result).toContain('React');
    expect(result).toContain('Node.js');
  });
});
