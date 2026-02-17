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
    Points: ({ children }: any) => <points>{children}</points>,
    PointMaterial: () => <pointsMaterial />,
  }
})

vi.mock('../components/ScrollProvider', async (importOriginal) => {
  const React = await import('react')
  return {
    useScroll: () => ({
      scrollProgress: 0,
      activeCredential: null,
      setActiveCredential: vi.fn(),
    }),
    ScrollContext: React.createContext(undefined),
    ScrollProvider: ({ children }: any) => <div>{children}</div>
  }
})

describe('VaultScene Component', () => {
  it('renders the vault with artifacts', () => {
    const { container } = render(<VaultScene progress={0.5} />)
    // We expect some 3D primitives to represent artifacts
    expect(container.querySelector('group')).toBeDefined()
    expect(container.querySelectorAll('mesh').length).toBeGreaterThan(0)
  })
})
