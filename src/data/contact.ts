export type AvailabilityStatus = 'open' | 'closed'

export interface ContactConfig {
  calendlyUrl: string
  availabilityStatus: AvailabilityStatus
  availabilityNote: string
}

export const contactConfig: ContactConfig = {
  calendlyUrl: 'https://calendly.com/wenceslausdsilva/30min?hide_event_type_details=1&hide_gdpr_banner=1',
  availabilityStatus: 'open',
  availabilityNote: 'Typically responds within 24 hours.',
}
