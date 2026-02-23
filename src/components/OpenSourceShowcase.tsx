'use client'

import { repos, LANGUAGE_COLORS, type RepoCard } from '@/data/repos'
import { Star, GitFork, ExternalLink } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import EditorialReveal from './EditorialReveal'

export { OpenSourceShowcase }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function RepoCard({ repo }: { repo: RepoCard }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!cardRef.current || hasAnimated || prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated || !cardRef.current || prefersReducedMotion()) return

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [hasAnimated])

  const handleMouseEnter = () => {
    if (cardRef.current && !prefersReducedMotion()) {
      gsap.to(cardRef.current, {
        y: -6,
        borderColor: 'rgba(99, 102, 241, 0.3)',
        boxShadow: '0 0 30px rgba(99, 102, 241, 0.15)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current && !prefersReducedMotion()) {
      gsap.to(cardRef.current, {
        y: 0,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 0 0px rgba(99, 102, 241, 0)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const languageColor = LANGUAGE_COLORS[repo.language] || '#6b7280'

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-2xl p-6 border border-white/10 transition-all pointer-events-auto cursor-default h-full flex flex-col"
    >
      {/* Language badge */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="size-2.5 rounded-full"
          style={{ backgroundColor: languageColor }}
          aria-hidden="true"
        />
        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
          {repo.language}
        </span>
      </div>

      {/* Repo name */}
      <h3 className="text-lg font-serif italic text-white mb-2 line-clamp-2">
        {repo.name}
      </h3>

      {/* Description */}
      <p className="text-zinc-400 text-sm mb-4 flex-grow line-clamp-2">
        {repo.description}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-2 mb-6">
        {repo.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Stats and link */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1">
            <Star className="size-3" />
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="size-3" />
            <span>{repo.forks}</span>
          </div>
        </div>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          aria-label={`View ${repo.name} repository on GitHub`}
        >
          <span>GitHub</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}

function OpenSourceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="w-full">
      <EditorialReveal direction="down">
        <div className="text-6xl md:text-[8rem] font-serif italic leading-none opacity-5 uppercase tracking-tighter pointer-events-none mb-2">
          Lab.
        </div>
      </EditorialReveal>

      <EditorialReveal direction="down" delay={0.1}>
        <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-[0.3em] mb-8 md:mb-12">
          Open Source Contributions
        </p>
      </EditorialReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  )
}
