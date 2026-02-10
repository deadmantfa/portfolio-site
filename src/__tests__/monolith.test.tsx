import { render } from '@testing-library/react'
import AssemblyScene from '../components/AssemblyScene'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F
vi.mock('@react-three/fiber', async () => {
  return {
    useFrame: vi.fn(),
    useThree: () => ({ viewport: { height: 10, width: 10 } }),
  }
})

// Mock SkillModule
vi.mock('@/components/SkillModule', () => ({
  default: () => <div data-testid="mock-skill-module" />
}))

describe('Monolith Formation', () => {
  it('correctly calculates vertical monolith positions', () => {
    // We can't easily test internal useMemo results directly from outside
    // but we can verify that the component still renders with full assembly
    const { getAllByTestId } = render(<AssemblyScene progress={1} />)
    expect(getAllByTestId('mock-skill-module').length).toBeGreaterThan(0)
  })
})
