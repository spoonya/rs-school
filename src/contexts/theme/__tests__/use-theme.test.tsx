import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocalStorage } from '@/hooks';
import { THEME_KEY, Themes } from '@/services';
import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from '../theme-context';
import { ThemeContext } from '../theme-context-def';

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
}));

const TestComponent = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  const setLocalStorage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocalStorage).mockReturnValue([Themes.DARK, setLocalStorage]);
  });

  it('should provide dark theme by default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(Themes.DARK);
  });

  it('should toggle theme from dark to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(setLocalStorage).toHaveBeenCalledWith(Themes.LIGHT);
  });

  it('should toggle theme from light to dark', () => {
    vi.mocked(useLocalStorage).mockReturnValue([Themes.LIGHT, setLocalStorage]);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(setLocalStorage).toHaveBeenCalledWith(Themes.DARK);
  });

  it('should apply theme class to wrapper', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(container.firstChild).toHaveClass('theme-provider');
    expect(container.firstChild).toHaveClass(Themes.DARK.toLowerCase());
  });

  it('should memoize context value', () => {
    const contextValues: Array<{ theme: Themes; toggleTheme: () => void }> = [];

    const TestConsumer = () => {
      const value = React.useContext(ThemeContext);
      contextValues.push(value);
      return null;
    };

    const { rerender } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const initialContextValue = contextValues[0];

    rerender(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(contextValues[1]).toBe(initialContextValue);
  });

  it('should use localStorage key correctly', () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(useLocalStorage).toHaveBeenCalledWith(THEME_KEY, Themes.DARK);
  });
});
