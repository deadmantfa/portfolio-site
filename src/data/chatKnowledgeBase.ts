import { projects } from './projects'
import { careerData } from './career'
import { skillModules } from './skills'

const buildSystemPrompt = (): string => {
  const projectSummaries = projects
    .map((p) => {
      const metrics = p.highlights.map((h) => `${h.label}: ${h.value}`).join(' | ')
      const adrSummaries = p.adrs
        .map((a) => `    • ${a.title}: ${a.solution} → ${a.impact}`)
        .join('\n')
      return `### ${p.title} — ${p.company} (${p.period})
  Role: ${p.role}
  Architecture: ${p.blueprint.type}
  Tech Stack: ${p.techStack.join(', ')}
  Challenge: ${p.challenge}
  Impact: ${p.impact}
  Key Metrics: ${metrics}
  Architectural Decisions:
${adrSummaries}`
    })
    .join('\n\n')

  const careerSummary = careerData
    .map(
      (m) =>
        `- ${m.year}: ${m.role} at ${m.company}. ${m.description}${m.highlights ? ` Highlights: ${m.highlights.join('; ')}` : ''}`,
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
- Keep responses concise (3-5 sentences unless the visitor asks for depth)
- Do not fabricate information — only reference the details provided below
- If asked something outside this context, acknowledge warmly and redirect
- When discussing a specific project, use the exact challenge, impact, and architectural decision details provided — do not paraphrase vaguely
- When citing metrics, always provide context (e.g. "reduced system runtime by 85% at Rooftop", not just "85%")

CAREER TIMELINE (most recent first):
${careerSummary}

PROJECT CASE STUDIES (detailed):
${projectSummaries}

TECHNICAL SKILLS:
${skillsByCategory}

KEY PRINCIPLES:
- Architecture decisions serve business outcomes, not the other way around
- Serverless and AI-first thinking for modern scalability
- Engineering culture is the foundation of every successful product
- 20+ years spanning fintech, e-commerce, creative platforms, EdTech, and AI/ML

When visitors ask about availability or working together, mention the "Schedule a Strategy Call" option at the bottom of the page.`
}

const STARTER_QUESTIONS: [string, string, string] = [
  "What's your approach to scaling engineering teams?",
  'Walk me through your biggest architectural challenge.',
  'What does a CTO engagement with you look like?',
]

export { buildSystemPrompt, STARTER_QUESTIONS }
