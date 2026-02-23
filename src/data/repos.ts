export interface RepoCard {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  topics: string[]
  url: string
}

export const LANGUAGE_COLORS: Record<string, string> = {
  PHP: '#4F5D95',
  Python: '#3572A5',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
}

export const repos: RepoCard[] = [
  {
    name: 'audiobookmaker',
    description: 'PDF → Audiobook via gTTS + Streamlit',
    language: 'Python',
    stars: 10,
    forks: 0,
    topics: ['audio', 'pdf', 'streamlit', 'gtts'],
    url: 'https://github.com/wenceslaus/audiobookmaker',
  },
  {
    name: 'edusec-college-management-system',
    description: 'College & School Management System',
    language: 'PHP',
    stars: 9,
    forks: 45,
    topics: ['cms', 'college', 'management', 'education'],
    url: 'https://github.com/wenceslaus/edusec-college-management-system',
  },
  {
    name: 'yii2-advanced-template-starter',
    description: 'Enterprise Yii2 + OAuth2 + ES + Notifications',
    language: 'PHP',
    stars: 3,
    forks: 0,
    topics: ['yii2', 'oauth2', 'elasticsearch', 'enterprise'],
    url: 'https://github.com/wenceslaus/yii2-advanced-template-starter',
  },
  {
    name: 'serverless-kanbanization',
    description: 'GitHub Project automation via Lambda',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    topics: ['serverless', 'lambda', 'github', 'automation'],
    url: 'https://github.com/wenceslaus/serverless-kanbanization',
  },
  {
    name: 'yii2-zoho-api-client',
    description: 'Zoho CRM API client for Yii2',
    language: 'PHP',
    stars: 1,
    forks: 2,
    topics: ['yii2', 'zoho', 'crm', 'api'],
    url: 'https://github.com/wenceslaus/yii2-zoho-api-client',
  },
]
