import '@testing-library/jest-dom/vitest';

import { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Themes } from '@/services';
import { makeStore } from '@/store';
import { cleanup, render, screen } from '@testing-library/react';

import ClientLayout from '../app/client-layout';

vi.mock('@/store', () => ({
  makeStore: vi.fn(() => ({
    dispatch: vi.fn(),
    getState: vi.fn(),
    subscribe: vi.fn(),
  })),
}));

vi.mock('@/contexts', () => ({
  ThemeProvider: (({ children, serverTheme }: { children?: ReactNode; serverTheme: Themes }) => (
    <div data-testid="theme-provider" data-theme={serverTheme}>
      {children}
    </div>
  )) as React.FC<{ serverTheme: Themes; children?: ReactNode }>,
}));

describe('ClientLayout', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders children correctly', () => {
    const testContent = 'Test Content';
    render(
      <ClientLayout>
        <div>{testContent}</div>
      </ClientLayout>
    );
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('wraps content with Redux Provider', () => {
    const testContent = 'Test Content';
    render(
      <ClientLayout>
        <div>{testContent}</div>
      </ClientLayout>
    );

    expect(makeStore).toHaveBeenCalledTimes(1);
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies ThemeProvider with correct serverTheme', () => {
    render(
      <ClientLayout>
        <div>Test</div>
      </ClientLayout>
    );

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('data-theme', Themes.LIGHT);
  });

  it('renders without crashing with no children', () => {
    const { container } = render(<ClientLayout />);
    expect(container).toBeInTheDocument();
  });

  it('maintains correct component hierarchy', () => {
    render(
      <ClientLayout>
        <span>Test</span>
      </ClientLayout>
    );

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toContainElement(screen.getByText('Test'));
  });
});
