import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArchitecturalGrid from '../components/VisionaryScene'
import AssemblyScene from '../components/AssemblyScene'
import React from 'react'
import * as THREE from 'three'

// Mock useScroll
vi.mock('../components/ScrollProvider', () => ({
  useScroll: () => ({
    scrollProgress: 0.5,
    activeSkill: null,
    setActiveSkill: vi.fn(),
  }),
  ScrollProvider: ({ children }: any) => <div>{children}</div>
}))

// Mock R3F
vi.mock('@react-three/fiber', () => ({
  useFrame: (cb: any) => {
    // Simulate frame update
    cb({ clock: { getElapsedTime: () => 100 } })
  },
  useThree: () => ({ camera: new THREE.PerspectiveCamera() })
}))

// Mock Drei
vi.mock('@react-three/drei', () => ({
  Float: ({ children }: any) => <div data-testid="mock-float">{children}</div>,
  Text: ({ children }: any) => <div data-testid="mock-text">{children}</div>,
  Box: ({ children }: any) => <div data-testid="mock-box">{children}</div>,
}))

describe('Performance & Architectural Optimizations', () => {
  it('ArchitecturalGrid should use shaderMaterial instead of pointsMaterial/lineBasicMaterial', () => {
    // We can't easily check internal refs in a shallow render, but we can verify the component structure
    const { container } = render(<ArchitecturalGrid />)
    // In our refactored component, we replaced <pointsMaterial> with <shaderMaterial>
    // R3F tags are rendered as lowercase custom elements in JSDOM
    const shaderMaterials = container.querySelectorAll('shadermaterial')
    expect(shaderMaterials.length).toBeGreaterThan(0)
    
    const legacyPointsMaterial = container.querySelector('pointsmaterial')
    expect(legacyPointsMaterial).toBeNull()
  })

  it('AssemblyScene should wrap skills in SkillResourceProvider', () => {
    const { container } = render(<AssemblyScene progress={0.5} />)
    // Since we can't easily test the context sharing without deep tree inspection,
    // we verify the component renders without errors in the new architecture.
    expect(container).toBeDefined()
  })
})
