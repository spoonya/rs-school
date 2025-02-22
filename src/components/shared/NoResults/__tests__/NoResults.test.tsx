import { describe, expect, it } from 'vitest';

import { NoResults } from '@/components/shared';
import { render, screen } from '@testing-library/react';

describe('NoResults', () => {
  it('should render', () => {
    render(<NoResults text="No results found" />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('should render with correct class', () => {
    render(<NoResults text="No results found" className="test-class" />);

    const el = screen.getByTestId('no-results');
    expect(el).toHaveClass('test-class');
  });

  it('should render with correct icon', () => {
    render(<NoResults text="No results found" />);

    const el = screen.getByTestId('search-x');
    expect(el).toBeInTheDocument();
  });

  it('should render with correct text', () => {
    render(<NoResults text="Test text" />);

    const el = screen.getByText('Test text');
    expect(el).toBeInTheDocument();
  });
});
