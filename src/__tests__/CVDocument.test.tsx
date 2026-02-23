import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { CVDocument } from '../components/CVDocument';
import { extractCVData } from '../utils/cv-data-extractor';

// Mock react-pdf to avoid canvas issues in jsdom
vi.mock('@react-pdf/renderer', () => ({
  Document: ({ children }: any) => <div data-testid="document">{children}</div>,
  Page: ({ children, style }: any) => <div data-testid="page" style={style}>{children}</div>,
  Text: ({ children, style }: any) => <span style={style}>{children}</span>,
  View: ({ children, style }: any) => <div style={style}>{children}</div>,
  StyleSheet: {
    create: (styles: any) => styles,
  },
  Font: {
    register: vi.fn(),
  },
  Image: ({ src, style }: any) => <img src={src} style={style} alt="pdf-img" />,
  Link: ({ children, src, style }: any) => <a href={src} style={style}>{children}</a>,
}));

describe('CVDocument Component', () => {
  const data = extractCVData();

  it('should render without crashing', () => {
    const { getByTestId } = render(<CVDocument data={data} />);
    expect(getByTestId('document')).toBeDefined();
    expect(getByTestId('page')).toBeDefined();
  });

  it('should contain the user name', () => {
    const { getByText } = render(<CVDocument data={data} />);
    expect(getByText('Wenceslaus Dsilva')).toBeDefined();
  });

  it('should contain the executive summary', () => {
    const { getByText } = render(<CVDocument data={data} />);
    expect(getByText(data.summary)).toBeDefined();
  });
});
