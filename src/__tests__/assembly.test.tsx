import { render } from '@testing-library/react'
import AssemblyScene from '../components/AssemblyScene'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F and SkillModule
vi.mock('@react-three/fiber', async () => {
  return {
    useFrame: vi.fn(),
    useThree: () => ({ viewport: { height: 10, width: 10 } }),
  }
})

vi.mock('@/components/SkillModule', () => ({
  default: () => <div data-testid="mock-skill-module" />
}))

describe('AssemblyScene Component', () => {
  it('renders all skill modules', () => {
    const { getAllByTestId } = render(<AssemblyScene progress={0} />)
    expect(getAllByTestId('mock-skill-module').length).toBeGreaterThan(0)
  })
})
