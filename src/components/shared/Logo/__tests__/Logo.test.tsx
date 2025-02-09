import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppRoutes } from '@/services';
import { render, screen } from '@testing-library/react';

import { Logo } from '../';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Logo', () => {
  it('renders correctly', () => {
    renderWithRouter(<Logo />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', AppRoutes.HOME);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    renderWithRouter(<Logo className={customClass} />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toHaveClass(customClass);
  });

  it('renders text content correctly', () => {
    renderWithRouter(<Logo />);
    expect(screen.getByText('NEX')).toBeInTheDocument();
    expect(screen.getByText('UM')).toBeInTheDocument();
    expect(screen.getByText('•')).toBeInTheDocument();
  });
});
