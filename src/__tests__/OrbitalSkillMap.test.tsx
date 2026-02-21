import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { OrbitalSkillMap } from '@/components/OrbitalSkillMap'

vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn(),
  useThree: () => ({ viewport: { width: 10, height: 10 } }),
}))

vi.mock('@react-three/drei', () => ({
  Points: ({ children }: any) => (
    <div data-testid="orbital-particles">{children}</div>
  ),
  PointMaterial: () => <div data-testid="particle-material" />,
  Line: () => <div data-testid="mock-line" />,
  Billboard: ({ children }: any) => (
    <div data-testid="mock-billboard">{children}</div>
  ),
  Text: ({ children }: any) => (
    <div data-testid="mock-text">{children}</div>
  ),
}))

vi.mock('@/components/OrbitalRing', () => ({
  OrbitalRing: ({ color }: any) => (
    <div data-testid="orbital-ring" data-color={color} />
  ),
}))

vi.mock('@/components/ScrollProvider', () => ({
  useScroll: () => ({
    setActiveSkill: vi.fn(),
  }),
}))

vi.mock('gsap', () => ({
  default: {
    to: vi.fn((target, config) => ({
      kill: vi.fn(),
    })),
  },
}))

describe('OrbitalSkillMap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const { container } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalSkillMap progress={0.5} exitProgress={0} />,
    )
    expect(container).toBeTruthy()
  })

  it('should render particle system', () => {
    const { getByTestId } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalSkillMap progress={0.5} exitProgress={0} />,
    )
    expect(getByTestId('orbital-particles')).toBeTruthy()
  })

  it('should render 4 orbital rings', () => {
    const { getAllByTestId } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalSkillMap progress={0.5} exitProgress={0} />,
    )
    const rings = getAllByTestId('orbital-ring')
    expect(rings).toHaveLength(4)
  })

  it('should pass correct colors to rings', () => {
    const { getAllByTestId } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalSkillMap progress={0.5} exitProgress={0} />,
    )
    const rings = getAllByTestId('orbital-ring')
    const colors = rings.map((ring) => ring.getAttribute('data-color'))

    expect(colors).toContain('#ec4899') // leadership
    expect(colors).toContain('#6366f1') // frontend
    expect(colors).toContain('#f59e0b') // backend
    expect(colors).toContain('#10b981') // infrastructure
  })

  it('should accept progress prop', () => {
    const { container } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalSkillMap progress={0.8} exitProgress={0} />,
    )
    expect(container).toBeTruthy()
  })

  it('should accept exitProgress prop', () => {
    const { container } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalSkillMap progress={0.5} exitProgress={0.5} />,
    )
    expect(container).toBeTruthy()
  })
})
