import { ReactNode } from 'react'

interface HighlightedParagraphProps {
  text: string
  className?: string
}

// Matches stats a skimmer's eye catches:
//   $50M, $50M+  — dollar amounts
//   85%, 99.99%  — percentages
//   10x, 3x      — multipliers
//   300+, 10,000+ — counts with plus
//   8 days, 4 weeks, 60 seconds, 5 months, 3 years — time durations
//   "zero"        — zero-incident / zero-downtime claims
const STAT_PATTERN =
  /(\bzero\b|\$[\d,]+[KMB]*\+?|\d[\d,.]*(?:%\+?|x\b|\+(?=\s|$)|\s+(?:days?|weeks?|months?|years?|seconds?|minutes?|hours?|languages?|artworks?|views?|properties?|institutions?|creatives?|subscribers?|incidents?|locations?|engineers?)))/gi

const splitWithHighlights = (text: string): (string | { stat: string; key: number })[] => {
  const parts: (string | { stat: string; key: number })[] = []
  let last = 0
  let keyCounter = 0
  const regex = new RegExp(STAT_PATTERN.source, STAT_PATTERN.flags)
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    parts.push({ stat: match[0], key: keyCounter++ })
    last = match.index + match[0].length
  }

  if (last < text.length) {
    parts.push(text.slice(last))
  }

  return parts
}

const HighlightedParagraph = ({ text, className = '' }: HighlightedParagraphProps) => {
  const parts = splitWithHighlights(text)

  const rendered: ReactNode[] = parts.map((part, i) => {
    if (typeof part === 'string') {
      return part
    }
    return (
      <mark
        key={`${part.key}-${i}`}
        data-highlight
        className="bg-transparent font-semibold text-zinc-100 not-italic"
      >
        {part.stat}
      </mark>
    )
  })

  return (
    <p className={className}>
      {rendered}
    </p>
  )
}

export { HighlightedParagraph }
