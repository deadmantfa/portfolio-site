import { redirect } from 'next/navigation'
import { shares } from '@/data/shares'
import { ShareOverlayWrapper } from '@/components/ShareOverlayWrapper'

interface Props {
  params: Promise<{ company: string }>
}

export function generateStaticParams() {
  return Object.keys(shares).map((company) => ({ company }))
}

export default async function ForCompanyPage({ params }: Props) {
  const { company } = await params
  const entry = shares[company.toLowerCase()]

  if (!entry) {
    redirect('/')
  }

  return <ShareOverlayWrapper entry={entry} />
}
