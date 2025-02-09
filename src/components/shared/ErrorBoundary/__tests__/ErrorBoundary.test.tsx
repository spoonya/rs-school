import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from '@/components/shared';
import { fireEvent, render, screen } from '@testing-library/react';

interface ChildProps {
  shouldThrow?: boolean;
}

const Child = ({ shouldThrow = false }: ChildProps) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Test child component</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test child component')).toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    render(
      <ErrorBoundary>
        <Child shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should reload page when Try Again button is clicked', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <Child shouldThrow />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Try Again'));
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
