import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { Search } from '../';

describe('Search component', () => {
  const mockOnSearch = vi.fn();
  const placeholderText = 'Search something...';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all elements with correct structure', () => {
    render(<Search placeholder={placeholderText} onSearch={mockOnSearch} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('should update search query when typing', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const testValue = 'test query';

    fireEvent.change(input, { target: { value: testValue } });

    expect(input).toHaveValue(testValue);
  });

  it('should call onSearch with empty string when input is cleared', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('should call onSearch with query when form is submitted via button click', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const testValue = 'submit test';

    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockOnSearch).toHaveBeenCalledWith(testValue);
  });

  it('should call onSearch with query when form is submitted via enter key', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const testValue = 'enter test';

    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.submit(screen.getByTestId('search-form'));

    expect(mockOnSearch).toHaveBeenCalledWith(testValue);
  });

  it('should apply custom className to form element', () => {
    const customClass = 'custom-search';
    render(<Search className={customClass} onSearch={mockOnSearch} />);

    const form = screen.getByTestId('search-form');
    expect(form).toHaveClass(customClass);
  });
});
