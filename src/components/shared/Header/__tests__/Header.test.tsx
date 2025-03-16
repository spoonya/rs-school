import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Header } from '../';

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Header className={customClass} />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass(customClass);
  });

  it('renders Logo component', () => {
    render(<Header />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });
});
