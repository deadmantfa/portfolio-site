export type AvailabilityStatus = 'open' | 'closed'

export interface ContactConfig {
  calendlyUrl: string
  availabilityStatus: AvailabilityStatus
  availabilityNote: string
}

export const contactConfig: ContactConfig = {
  calendlyUrl: 'https://calendly.com/wenceslausdsilva',
  availabilityStatus: 'open',
  availabilityNote: 'Typically responds within 24 hours.',
}
