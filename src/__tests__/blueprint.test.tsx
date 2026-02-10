import { render, screen } from '@testing-library/react'
import BlueprintOverlay from '../components/BlueprintOverlay'
import { expect, it, describe } from 'vitest'

describe('BlueprintOverlay Component', () => {
  it('renders technical annotations when active', () => {
    const mockProject = {
      slug: 'test-project',
      adrs: [{ title: 'Test ADR', decision: 'Test Decision', rationale: 'Test Rationale' }],
      techStack: ['React', 'Three.js']
    }
    
    render(<BlueprintOverlay project={mockProject as any} />)
    expect(screen.getByText(/BLUEPRINT/i)).toBeInTheDocument()
    expect(screen.getByText(/Test ADR/i)).toBeInTheDocument()
  })
})
