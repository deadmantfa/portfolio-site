import type { CareerMilestone } from '../data/career';
import type { ProjectCaseStudy } from '../data/projects';
import type { SkillModule } from '../data/skills';

export function mapCareerToMarkdown(careerData: CareerMilestone[]): string {
  return careerData.map(item => {
    let md = `### ${item.company}\n**${item.role}** (${item.year})\n\n${item.description}\n`;
    if (item.highlights && item.highlights.length > 0) {
      md += "\n" + item.highlights.map((h: string) => `- ${h}`).join('\n') + '\n';
    }
    return md;
  }).join('\n---\n\n');
}

export function mapProjectsToMarkdown(projects: ProjectCaseStudy[]): string {
  return projects.map(project => {
    return `### ${project.title}\n**Company:** ${project.company} | **Period:** ${project.period}\n\n**Impact:** ${project.impact}\n\n**Tech Stack:** ${project.techStack.map((t: string) => `\`${t}\``).join(' ')}\n`;
  }).join('\n---\n\n');
}

export function mapSkillsToMarkdown(skills: SkillModule[]): string {
  const categories: Record<string, string[]> = {};
  skills.forEach(skill => {
    if (!categories[skill.category]) categories[skill.category] = [];
    categories[skill.category].push(skill.name);
  });

  return Object.entries(categories).map(([category, names]) => {
    const title = category.charAt(0).toUpperCase() + category.slice(1);
    return `**${title}:** ${names.join(', ')}`;
  }).join('  \n');
}
