import '@testing-library/jest-dom';

import { describe, expect, it, vi } from 'vitest';

import { Pagination } from '@/components/shared';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Pagination', () => {
  const defaultProps = {
    itemsPerPage: 10,
    totalItems: 100,
    currentPage: 1,
    paginate: vi.fn(),
  };

  it('calls paginate with correct page number when clicking page button', () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);
    expect(defaultProps.paginate).toHaveBeenCalledWith(2);
  });

  it('calls paginate with next page when clicking next button', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextButton);
    expect(defaultProps.paginate).toHaveBeenCalledWith(2);
  });

  it('calls paginate with previous page when clicking previous button', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const prevButton = screen.getByRole('button', { name: /previous page/i });
    fireEvent.click(prevButton);
    expect(defaultProps.paginate).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByRole('button', { name: /previous page/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    expect(nextButton).toBeDisabled();
  });

  it('does not render pagination if there is only one page', () => {
    render(<Pagination {...defaultProps} totalItems={5} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('shows correct page numbers and ellipsis', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalItems={100} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
