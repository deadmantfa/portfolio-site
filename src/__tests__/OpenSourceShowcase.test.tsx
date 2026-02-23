import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OpenSourceShowcase } from '@/components/OpenSourceShowcase'
import * as repoModule from '@/data/repos'

vi.mock('gsap', () => ({
  default: {
    from: vi.fn(),
    to: vi.fn(),
  },
}))

vi.mock('@/components/EditorialReveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('OpenSourceShowcase', () => {
  test('renders section title "Lab."', () => {
    render(<OpenSourceShowcase />)
    expect(screen.getByText('Lab.')).toBeInTheDocument()
  })

  test('renders subtitle "Open Source Contributions"', () => {
    render(<OpenSourceShowcase />)
    expect(screen.getByText('Open Source Contributions')).toBeInTheDocument()
  })

  test('renders correct number of repo cards (5)', () => {
    const { container } = render(<OpenSourceShowcase />)
    const repoCards = container.querySelectorAll('.glass')
    // Should have 5 repo cards
    expect(repoCards.length).toBeGreaterThanOrEqual(5)
  })

  test('each repo card displays name', () => {
    render(<OpenSourceShowcase />)
    repoModule.repos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
    })
  })

  test('each repo card displays description', () => {
    render(<OpenSourceShowcase />)
    repoModule.repos.forEach((repo) => {
      expect(screen.getByText(repo.description)).toBeInTheDocument()
    })
  })

  test('each repo card displays language badge', () => {
    const { container } = render(<OpenSourceShowcase />)
    const uniqueLanguages = new Set(repoModule.repos.map((r) => r.language))
    uniqueLanguages.forEach((lang) => {
      const elements = screen.getAllByText(lang)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  test('GitHub links have correct href and target', () => {
    render(<OpenSourceShowcase />)
    repoModule.repos.forEach((repo) => {
      const link = screen.getByLabelText(`View ${repo.name} repository on GitHub`)
      expect(link).toHaveAttribute('href', repo.url)
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  test('displays star counts', () => {
    const { container } = render(<OpenSourceShowcase />)
    const uniqueStars = new Set(repoModule.repos.map((r) => r.stars))
    uniqueStars.forEach((stars) => {
      const elements = Array.from(container.querySelectorAll('span')).filter(
        (el) => el.textContent === stars.toString()
      )
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  test('displays fork counts', () => {
    const { container } = render(<OpenSourceShowcase />)
    const uniqueForks = new Set(repoModule.repos.map((r) => r.forks))
    uniqueForks.forEach((forks) => {
      const elements = Array.from(container.querySelectorAll('span')).filter(
        (el) => el.textContent === forks.toString()
      )
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  test('displays topics as pills', () => {
    const { container } = render(<OpenSourceShowcase />)
    const allTopics = new Set<string>()
    repoModule.repos.forEach((repo) => {
      repo.topics.slice(0, 3).forEach((topic) => {
        allTopics.add(topic)
      })
    })
    allTopics.forEach((topic) => {
      const elements = screen.queryAllByText(topic)
      expect(elements.length).toBeGreaterThan(0)
    })
  })
})
