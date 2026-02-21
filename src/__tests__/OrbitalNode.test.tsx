import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { OrbitalNode } from '@/components/OrbitalNode'
import { skillModules } from '@/data/skills'

vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn(),
  useThree: () => ({ viewport: { width: 10, height: 10 } }),
  ThreeEvent: {},
}))

vi.mock('@react-three/drei', () => ({
  Billboard: ({ children }: any) => (
    <div data-testid="mock-billboard">{children}</div>
  ),
  Text: ({ children }: any) => (
    <div data-testid="mock-text">{children}</div>
  ),
}))

vi.mock('@/components/ScrollProvider', () => ({
  useScroll: () => ({
    setActiveSkill: vi.fn(),
  }),
}))

describe('OrbitalNode', () => {
  const testSkill = skillModules[0]
  const defaultProps = {
    skill: testSkill,
    position: [1, 2, 3] as [number, number, number],
    color: '#6366f1',
    hovered: false,
    anyHovered: false,
    onHover: vi.fn(),
    onHoverEnd: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const { container } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalNode {...defaultProps} />,
    )
    expect(container).toBeTruthy()
  })

  it('should render Billboard wrapper', () => {
    const { getByTestId } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalNode {...defaultProps} />,
    )
    expect(getByTestId('mock-billboard')).toBeTruthy()
  })

  it('should render skill name in uppercase in text element', () => {
    const { getByTestId } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalNode {...defaultProps} />,
    )
    const textElement = getByTestId('mock-text')
    expect(textElement.textContent).toBe(testSkill.name.toUpperCase())
  })

  it('should accept color prop', () => {
    const customColor = '#10b981'
    const { container } = render(
      // @ts-expect-error - Three.js context not available in test
      <OrbitalNode {...defaultProps} color={customColor} />,
    )
    expect(container).toBeTruthy()
  })
})
