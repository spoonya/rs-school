import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Themes } from '@/services';
import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeSwitcher } from '../';

const mockUseTheme = vi.hoisted(() => ({
  useTheme: vi.fn(() => ({
    theme: Themes.LIGHT,
    toggleTheme: vi.fn(),
  })),
}));

vi.mock('@/hooks/use-theme', () => mockUseTheme);

describe('ThemeSwitcher', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.useTheme.mockReturnValue({
      theme: Themes.LIGHT,
      toggleTheme: mockToggleTheme,
    });
  });

  it('should render with light theme icon', () => {
    render(<ThemeSwitcher />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('should render with dark theme icon', () => {
    mockUseTheme.useTheme.mockReturnValue({
      theme: Themes.DARK,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('should call toggleTheme when clicked', () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
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
