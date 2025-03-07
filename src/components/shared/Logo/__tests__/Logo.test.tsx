import { describe, expect, it, vi } from 'vitest';

import { AppRoutes } from '@/services';
import { render, screen } from '@testing-library/react';

import { Logo } from '../';

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className} data-testid="logo">
      {children}
    </a>
  ),
}));

describe('Logo', () => {
  it('renders correctly', () => {
    render(<Logo />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', AppRoutes.HOME);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Logo className={customClass} />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toHaveClass(customClass);
  });

  it('renders text content correctly', () => {
    render(<Logo />);
    expect(screen.getByText('NEX')).toBeInTheDocument();
    expect(screen.getByText('UM')).toBeInTheDocument();
    expect(screen.getByText('•')).toBeInTheDocument();
  });
});
