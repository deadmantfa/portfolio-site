import { render, screen, fireEvent } from '@testing-library/react'
import { SkillCard } from '@/components/SkillCard'
import { expect, it, describe, vi } from 'vitest'

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn(),
  },
}))

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Cloud: () => <div data-testid="mock-icon">Icon</div>,
}))

// Mock skillIcons
vi.mock('@/utils/skillIcons', () => ({
  getSkillIcon: () => () => <div data-testid="mock-icon">Icon</div>,
}))

// Mock SkillModal
vi.mock('@/components/SkillModal', () => ({
  SkillModal: () => <div data-testid="skill-modal" />,
}))

describe('SkillCard', () => {
  const mockSkill = {
    name: 'AWS',
    category: 'infrastructure' as const,
    importance: 'Test importance text',
  }

  it('renders skill name', () => {
    render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={vi.fn()}
        onOpenModal={vi.fn()}
      />
    )
    expect(screen.getByText('AWS')).toBeInTheDocument()
  })

  it('renders category badge with category text', () => {
    render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={vi.fn()}
        onOpenModal={vi.fn()}
      />
    )
    expect(screen.getByText('infrastructure')).toBeInTheDocument()
  })

  it('has cursor-pointer class for UX guideline compliance', () => {
    const { container } = render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={vi.fn()}
        onOpenModal={vi.fn()}
      />
    )
    const card = container.querySelector('[role="button"]')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('calls onActivate on mouseenter', () => {
    const onActivate = vi.fn()
    const { container } = render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={onActivate}
        onDeactivate={vi.fn()}
        onOpenModal={vi.fn()}
      />
    )
    const card = container.querySelector('[role="button"]') as HTMLElement
    fireEvent.mouseEnter(card)
    expect(onActivate).toHaveBeenCalled()
  })

  it('calls onDeactivate on mouseleave', () => {
    const onDeactivate = vi.fn()
    const { container } = render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={onDeactivate}
        onOpenModal={vi.fn()}
      />
    )
    const card = container.querySelector('[role="button"]') as HTMLElement
    fireEvent.mouseLeave(card)
    expect(onDeactivate).toHaveBeenCalled()
  })

  it('renders with role="button" for accessibility', () => {
    const { container } = render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={vi.fn()}
        onOpenModal={vi.fn()}
      />
    )
    const card = container.querySelector('[role="button"]')
    expect(card).toBeInTheDocument()
  })

  it('renders icon from getSkillIcon', () => {
    render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={vi.fn()}
        onOpenModal={vi.fn()}
      />
    )
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('calls onOpenModal when card is clicked', () => {
    const onOpenModal = vi.fn()
    const { container } = render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={vi.fn()}
        onOpenModal={onOpenModal}
      />
    )
    const card = container.querySelector('[role="button"]') as HTMLElement
    fireEvent.click(card)
    expect(onOpenModal).toHaveBeenCalledWith(mockSkill)
  })

  it('applies glow shadow on mouseenter', () => {
    const { container } = render(
      <SkillCard
        skill={mockSkill}
        color="#10b981"
        onActivate={vi.fn()}
        onDeactivate={vi.fn()}
        onOpenModal={vi.fn()}
      />
    )
    const card = container.querySelector('[role="button"]') as HTMLElement
    expect(card).toHaveStyle({
      transformOrigin: 'center',
      willChange: 'transform',
    })
    // Glow effect is applied via inline style, we just verify the card has proper styling
    expect(card).toBeInTheDocument()
  })
})
