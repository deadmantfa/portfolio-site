'use client'

import { redirect } from 'next/navigation'
import { use, useState } from 'react'
import { shares } from '@/data/shares'
import { ShareOverlay } from '@/components/ShareOverlay'
import Home from '@/app/page'

interface Props {
  params: Promise<{ company: string }>
}

const generateStaticParams = () =>
  Object.keys(shares).map((company) => ({ company }))

const ForCompanyPage = ({ params }: Props) => {
  const { company } = use(params)
  const entry = shares[company.toLowerCase()]

  if (!entry) {
    redirect('/')
  }

  const [overlayDismissed, setOverlayDismissed] = useState(false)

  return (
    <>
      {!overlayDismissed && (
        <ShareOverlay
          entry={entry}
          onDismiss={() => setOverlayDismissed(true)}
        />
      )}
      <Home />
    </>
  )
}

export { generateStaticParams }
export default ForCompanyPage
