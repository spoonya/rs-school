import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Container } from '../';

describe('Container', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';
    render(<Container>{testContent}</Container>);
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const testContent = 'Test Content';
    const { container } = render(<Container className={customClass}>{testContent}</Container>);
    expect(container.firstChild).toHaveClass(customClass);
  });
});
