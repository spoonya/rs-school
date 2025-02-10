import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Header } from '../';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Header', () => {
  it('renders correctly', () => {
    renderWithRouter(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    renderWithRouter(<Header className={customClass} />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass(customClass);
  });

  it('renders Logo component', () => {
    renderWithRouter(<Header />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });
});
