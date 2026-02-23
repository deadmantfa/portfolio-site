export interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
  initials: string
  linkedinUrl?: string
  imagePath?: string // e.g., '/images/testimonials/gavin-fonseca.jpg'
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Wenceslaus is an innovative and hardworking individual focused on delivering excellent quality output. He painstakingly tweaks every bit of code to make it just right for the end user. He is a great team player and reliable too.',
    name: 'Gavin Fonseca',
    title: 'Solutions Architecture & CRM Specialist',
    company: 'TCS',
    initials: 'GF',
    linkedinUrl: 'https://www.linkedin.com/in/gavinfonseca',
    imagePath: '/images/testimonials/gavin-fonseca.jpg',
  },
  {
    quote: 'The ability to think of a tech-solution from a use-case and general application POV comes easiest to Wenceslaus. At IndieFolio Network he was responsible for the product from day 1 and his valued ideas, suggestions and implementations have helped scale the product.',
    name: 'Carl George',
    title: 'Creative Professional Director',
    company: 'IndieFolio',
    initials: 'CG',
    linkedinUrl: 'https://www.linkedin.com/in/carlgeorge',
    imagePath: '/images/testimonials/carl-george.jpg',
  },
  {
    quote: 'As IndieFolio\'s CTO, he is responsible for all tech developments. I am always in awe of how Wency keeps himself updated with all things new in tech. You can expect Wency to be one of the most loved team members as he takes care of everyone\'s needs, personally and professionally.',
    name: 'Kavan Antani',
    title: 'CEO & Forbes 30u30 Asia',
    company: 'IndieFolio',
    initials: 'KA',
    linkedinUrl: 'https://www.linkedin.com/in/kavanantani/',
    imagePath: '/images/testimonials/kavan-antani.jpg',
  },
  {
    quote: 'IT stands for Mr. Dsilva.',
    name: 'Mohammad Al-Adwan',
    title: 'Cluster Manager',
    company: 'Emirates National Schools',
    initials: 'MA',
    linkedinUrl: 'https://www.linkedin.com/in/mohammada3/',
    imagePath: '/images/testimonials/mohammad-al-adwan.jpg',
  },
  {
    quote: 'Wenceslaus, a go getter. Always up for a task to work on. His excitement for work is compelling, patient and cool headed. A good team player.',
    name: 'Dinesh Jethwa',
    title: 'Market Research',
    company: 'TCS',
    initials: 'DJ',
    linkedinUrl: 'https://www.linkedin.com/in/dineshtjethwa',
    imagePath: '/images/testimonials/dinesh-jethwa.jpg',
  },
  {
    quote: 'Wency is a proactive contributor who would make a great addition to any team. He impressed all of us by his knowledge on the subject, and the way he used to tackle any problem. He is innovative, dedicated and a bright person.',
    name: 'Harshidi Mudaliar',
    title: 'Business Intelligence Analyst',
    company: 'NielsenIQ',
    initials: 'HM',
    linkedinUrl: 'https://www.linkedin.com/in/harshidi-mudaliar-657b8850/',
    imagePath: '/images/testimonials/harshidi-mudaliar.jpg',
  },
]
