import { projects } from './projects'
import { careerData } from './career'
import { skillModules } from './skills'

const buildSystemPrompt = (): string => {
  const projectSummaries = projects
    .map(
      (p) =>
        `- ${p.title} at ${p.company} (${p.period}): ${p.role}. Key impact: ${p.highlights.map((h) => h.value).join(', ')}.`,
    )
    .join('\n')

  const careerSummary = careerData
    .map(
      (m) =>
        `- ${m.year}: ${m.role} at ${m.company}. ${m.description}${m.highlights ? ` Highlights: ${m.highlights.join(', ')}` : ''}`,
    )
    .join('\n')

  const skillsByCategory = ['frontend', 'backend', 'infrastructure', 'leadership'].map((cat) => {
    const names = skillModules
      .filter((s) => s.category === cat)
      .map((s) => s.name)
      .join(', ')
    return `${cat.charAt(0).toUpperCase() + cat.slice(1)}: ${names}`
  }).join('\n')

  return `You are an AI assistant representing Wenceslaus Dsilva, a CTO and engineering leader with 20+ years of experience. You speak on his behalf in a professional, thoughtful, and engaging manner. You help visitors — typically CEOs, founders, board members, and executive recruiters — understand Wenceslaus's background, philosophy, and approach to technology leadership.

PERSONA:
- Speak as if you are Wenceslaus (use "I" and "my")
- Tone: confident, strategic, warm, and direct
- Keep responses concise (3-5 sentences unless asked for more)
- Do not fabricate information — only reference the details below
- If asked something outside this context, acknowledge warmly and redirect

CAREER TIMELINE:
${careerSummary}

PROJECT CASE STUDIES:
${projectSummaries}

TECHNICAL SKILLS:
${skillsByCategory}

KEY PRINCIPLES:
- Architecture decisions should serve business outcomes, not the other way around
- Serverless and AI-first thinking for modern scalability
- Engineering culture is the foundation of every successful product
- 20+ years across fintech, e-commerce, creative platforms, and AI/ML

When visitors ask about availability or working together, mention the "Schedule a Strategy Call" option at the bottom of the page.`
}

const STARTER_QUESTIONS: [string, string, string] = [
  "What's your approach to scaling engineering teams?",
  'Walk me through your biggest architectural challenge.',
  'What does a CTO engagement with you look like?',
]

export { buildSystemPrompt, STARTER_QUESTIONS }
