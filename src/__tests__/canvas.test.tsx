import { render, screen } from '@testing-library/react'
import SceneCanvas from '../components/SceneCanvas'
import { expect, it, describe, vi } from 'vitest'

// Mock R3F Canvas
vi.mock('@react-three/fiber', async () => {
  return {
    Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-canvas">{children}</div>,
  }
})

describe('SceneCanvas Component', () => {
  it('renders the canvas', () => {
    render(
      <SceneCanvas>
        <mesh data-testid="mock-mesh" />
      </SceneCanvas>
    )
    expect(screen.getByTestId('mock-canvas')).toBeInTheDocument()
  })
})
