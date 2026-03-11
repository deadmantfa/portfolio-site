export type AvailabilityStatus = 'open' | 'closed'

export interface ContactConfig {
  calLink: string
  availabilityStatus: AvailabilityStatus
  availabilityNote: string
}

export const contactConfig: ContactConfig = {
  calLink: 'wenceslaus-dsilva/strategy-call',
  availabilityStatus: 'open',
  availabilityNote: 'Typically responds within 24 hours.',
}
