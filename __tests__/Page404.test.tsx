import { useRouter } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AppRoutes } from '@/services';
import { fireEvent, render, screen } from '@testing-library/react';

import Page404 from '../app/not-found';

vi.mock('@/styles/404.module.scss', () => ({
  default: {
    root: 'mock-root-class',
    title: 'mock-title-class',
    message: 'mock-message-class',
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('@/layouts/LayoutDefault', () => ({
  LayoutDefault: ({ children }: { children: React.ReactNode }) => <div data-testid="layout-default">{children}</div>,
}));

describe('Page404 Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as vi.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders basic elements correctly', () => {
    render(<Page404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/The page you are looking for does not exist./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back home/i })).toBeInTheDocument();
  });

  it('uses LayoutDefault wrapper', () => {
    render(<Page404 />);

    expect(screen.getByTestId('layout-default')).toBeInTheDocument();
    expect(screen.getByTestId('page-404')).toBeInTheDocument();
  });

  it('navigates to home page when button clicked', () => {
    render(<Page404 />);

    fireEvent.click(screen.getByRole('button', { name: /Back home/i }));
    expect(mockPush).toHaveBeenCalledWith(AppRoutes.HOME);
  });

  it('applies correct CSS classes', () => {
    render(<Page404 />);

    expect(screen.getByTestId('page-404')).toHaveClass('mock-root-class');
    expect(screen.getByText('404')).toHaveClass('mock-title-class');
    expect(screen.getByText(/The page you are looking for does not exist./i)).toHaveClass('mock-message-class');
  });
});
