'use client'

import { useState } from 'react'
import { ShareOverlay } from '@/components/ShareOverlay'
import type { ShareEntry } from '@/data/shares'
import dynamic from 'next/dynamic'

const Home = dynamic(() => import('@/app/page'), { ssr: false })

interface ShareOverlayWrapperProps {
  entry: ShareEntry
}

const ShareOverlayWrapper = ({ entry }: ShareOverlayWrapperProps) => {
  const [dismissed, setDismissed] = useState(false)

  return (
    <>
      {!dismissed && (
        <ShareOverlay entry={entry} onDismiss={() => setDismissed(true)} />
      )}
      <Home />
    </>
  )
}

export { ShareOverlayWrapper }
