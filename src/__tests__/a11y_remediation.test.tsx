import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import { Navigation } from '@/components/Navigation';

expect.extend(toHaveNoViolations);

// Mock server action
vi.mock('@/app/actions/contact', () => ({
  sendEmail: vi.fn()
}));

describe('Accessibility Checks', () => {
  it('ContactForm should have no accessibility violations', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('SocialLinks should have no accessibility violations', async () => {
    const { container } = render(<SocialLinks />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Navigation should have no accessibility violations', async () => {
    const { container } = render(<Navigation />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
