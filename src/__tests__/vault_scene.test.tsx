import { render } from '@testing-library/react'
import VaultScene from '../components/VaultScene'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F useFrame
vi.mock('@react-three/fiber', async () => {
  return {
    useFrame: vi.fn(),
  }
})

// Mock @react-three/drei
vi.mock('@react-three/drei', async () => {
  return {
    Float: ({ children }: any) => <group>{children}</group>,
    Text: ({ children }: any) => <mesh>{children}</mesh>,
  }
})

vi.mock('../components/ScrollProvider', async (importOriginal) => {
  const React = await import('react')
  return {
    useScroll: () => ({
      scrollProgress: 0,
      activeSkill: null,
      setActiveSkill: vi.fn(),
    }),
    ScrollContext: React.createContext(undefined),
    ScrollProvider: ({ children }: any) => <div>{children}</div>
  }
})

describe('VaultScene Component', () => {
  it('renders the vault scene with artifacts', () => {
    const { container } = render(<VaultScene />)
    // We expect some 3D primitives to represent artifacts
    expect(container.querySelector('group')).toBeDefined()
    expect(container.querySelector('mesh')).toBeDefined()
  })
})
