import { describe, expect, it, vi } from 'vitest';

import { useTheme } from '@/contexts';
import { Themes } from '@/services';
import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeSwitcher } from '../';

vi.mock('@/contexts', () => ({
  useTheme: vi.fn(() => ({
    theme: Themes.LIGHT,
    toggleTheme: vi.fn(),
  })),
}));

describe('ThemeSwitcher', () => {
  it('should render with light theme icon', () => {
    render(<ThemeSwitcher />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).toBeNull();
  });

  it('should render with dark theme icon', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: Themes.DARK,
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitcher />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).toBeNull();
  });

  it('should call toggleTheme when clicked', () => {
    const toggleTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: Themes.LIGHT,
      toggleTheme,
    });

    render(<ThemeSwitcher />);

    fireEvent.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const testClass = 'custom-class';
    render(<ThemeSwitcher className={testClass} />);

    expect(screen.getByRole('button')).toHaveClass(testClass);
  });

  it('should have correct aria-label', () => {
    render(<ThemeSwitcher />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle theme');
  });
});
