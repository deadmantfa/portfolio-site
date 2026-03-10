export interface ShareEntry {
  company: string
  message: string
  accentLabel: string
}

export const shares: Record<string, ShareEntry> = {
  stripe: {
    company: 'Stripe',
    message: 'Wenceslaus built this specifically for your team — 20 years of engineering leadership, distilled.',
    accentLabel: 'TRANSMISSION INCOMING',
  },
  databricks: {
    company: 'Databricks',
    message: 'A focused view into 20 years of scaling data-driven platforms and hypergrowth engineering teams.',
    accentLabel: 'TRANSMISSION INCOMING',
  },
  vercel: {
    company: 'Vercel',
    message: 'Built for a team that ships fast — here is what 20 years of platform thinking looks like in practice.',
    accentLabel: 'TRANSMISSION INCOMING',
  },
  notion: {
    company: 'Notion',
    message: 'Wenceslaus put this together specifically for Notion — a career defined by building tools people love.',
    accentLabel: 'TRANSMISSION INCOMING',
  },
  anthropic: {
    company: 'Anthropic',
    message: 'A portfolio built with AI at its core — 20 years of engineering leadership meeting the frontier.',
    accentLabel: 'TRANSMISSION INCOMING',
  },
}
