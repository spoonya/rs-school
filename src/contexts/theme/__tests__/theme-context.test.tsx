import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeContext } from '@/contexts';
import { THEME_KEY, Themes } from '@/services';
import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from '../theme-provider';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

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
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('should toggle theme from dark to light', () => {
    render(
      <ThemeProvider serverTheme={Themes.DARK}>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.setItem).toHaveBeenCalledWith(THEME_KEY, Themes.LIGHT);
    expect(screen.getByTestId('theme')).toHaveTextContent(Themes.LIGHT);
  });

  it('should toggle theme from light to dark', () => {
    render(
      <ThemeProvider serverTheme={Themes.LIGHT}>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.setItem).toHaveBeenCalledWith(THEME_KEY, Themes.DARK);
    expect(screen.getByTestId('theme')).toHaveTextContent(Themes.DARK);
  });
});
