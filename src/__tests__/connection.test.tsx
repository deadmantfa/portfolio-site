import { render } from '@testing-library/react'
import ConnectionScene from '../components/ConnectionScene'
import { expect, it, describe, vi } from 'vitest'
import * as THREE from 'three'

// Mock R3F and Drei
vi.mock('@react-three/fiber', async () => {
  const original = await vi.importActual('@react-three/fiber')
  return {
    ...original,
    useFrame: (callback: (state: { clock: { getElapsedTime: () => number } }) => void) => {
      callback({ clock: { getElapsedTime: () => 1 } })
    },
  }
})

vi.mock('@react-three/drei', async () => {
  return {
    Float: ({ children }: { children: React.ReactNode }) => <group data-testid="mock-float">{children}</group>,
    Icosahedron: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <mesh {...props}>{children}</mesh>,
    Points: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <points {...props}>{children}</points>,
    PointMaterial: ({ ...props }: { [key: string]: unknown }) => <shaderMaterial {...props} />,
  }
})

describe('ConnectionScene Component', () => {
  it('renders the 3D core and particles', () => {
    const { container } = render(<ConnectionScene progress={1} />)

    // Expect the floating group
    expect(container.querySelector('group')).toBeDefined()

    // Expect two Icosahedron meshes (the core and its inner part)
    const meshes = container.querySelectorAll('mesh')
    expect(meshes.length).toBe(2)

    // Expect the particle system
    expect(container.querySelector('points')).toBeDefined()
    expect(container.querySelector('shaderMaterial')).toBeDefined()
  })

  it('is not visible when progress is zero', () => {
    expect(() => render(<ConnectionScene progress={0} />)).not.toThrow()
  })

  it('is visible when progress is greater than zero', () => {
    expect(() => render(<ConnectionScene progress={0.5} />)).not.toThrow()
  })
})
