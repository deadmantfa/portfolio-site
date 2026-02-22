import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock ScrollProvider
vi.mock('@/components/ScrollProvider', () => ({
  useScroll: () => ({ setActiveCredential: vi.fn() }),
  ScrollContext: React.createContext(null),
  ScrollProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock ContactForm to avoid Resend API key requirement
vi.mock('@/components/ContactForm', () => ({
  default: () => <div>Contact Form</div>
}));

// Mock SceneCanvas
vi.mock('@/components/SceneCanvas', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="scene-canvas">{children}</div>
}));

// Mock next/dynamic
vi.mock('next/dynamic', () => {
  return {
    default: () => {
      // Return a component that renders the test id we're looking for
      const DynamicComponent = () => <div data-testid="dynamic-scene">Dynamic Scene Loaded</div>;
      DynamicComponent.displayName = 'DynamicComponent';
      return DynamicComponent;
    },
  }
});

import Home from '../app/page';

describe('Home Page Dynamic Loading', () => {
  it('renders the page structure and dynamic placeholders', () => {
    render(<Home />);
    
    // Check for static content
    expect(screen.getByText(/The Visionary/i)).toBeInTheDocument();
    
    // Check for dynamic component placeholder
    // This will pass only if Home uses dynamic import
    expect(screen.queryByTestId('dynamic-scene')).toBeInTheDocument();
  });
});
