import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import AssemblyScene from '../components/AssemblyScene'
import { skillModules } from '../data/skills'
import React from 'react'

// Mock react-three-fiber and drei
vi.mock('@react-three/fiber', () => ({
  useFrame: () => {},
  useThree: () => ({}),
}))

vi.mock('@react-three/drei', () => ({
  Float: ({ children }: any) => <div>{children}</div>,
  Text: ({ children }: any) => <div>{children}</div>,
}))

// Mock SkillModuleComponent to simplify
vi.mock('../components/SkillModule', () => ({
  default: ({ skill }: any) => <div data-testid="skill-module">{skill.name}</div>
}))

// Mock SkillResourceProvider
vi.mock('../components/SkillResourceProvider', () => ({
  SkillResourceProvider: ({ children }: any) => <div>{children}</div>,
  useSkillResources: () => ({})
}))

describe('AssemblyScene 3D Integration', () => {
  it('renders all skill modules from the data source', () => {
    const { getAllByTestId } = render(<AssemblyScene progress={1} />)
    const modules = getAllByTestId('skill-module')
    expect(modules.length).toBe(skillModules.length)
  })

  it('specifically renders the new AI Strategy and Team Building modules', () => {
    const { getByText } = render(<AssemblyScene progress={1} />)
    expect(getByText('AI Strategy')).toBeDefined()
    expect(getByText('Team Building')).toBeDefined()
    expect(getByText('Critical Thinking')).toBeDefined()
    expect(getByText('Design Thinking')).toBeDefined()
  })
})
