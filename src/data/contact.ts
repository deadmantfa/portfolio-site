export type AvailabilityStatus = 'open' | 'closed'

export interface ContactConfig {
  calendlyUrl: string
  availabilityStatus: AvailabilityStatus
  availabilityNote: string
}

export const contactConfig: ContactConfig = {
  calendlyUrl: 'https://calendly.com/wenceslausdsilva/30min',
  availabilityStatus: 'open',
  availabilityNote: 'Typically responds within 24 hours.',
}
