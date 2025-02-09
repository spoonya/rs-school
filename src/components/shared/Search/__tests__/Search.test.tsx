import '@testing-library/jest-dom';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Search } from '@/components/shared';
import { SEARCH_QUERY_KEY } from '@/services/constants';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Search', () => {
  const mockOnSearch = vi.fn();
  const testSearchValue = 'bitcoin';

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
  });

  it('saves search query to localStorage when searching', () => {
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: testSearchValue } });
    fireEvent.click(searchButton);

    expect(JSON.parse(localStorage.getItem(SEARCH_QUERY_KEY) || '')).toBe(testSearchValue);
    expect(mockOnSearch).toHaveBeenCalledWith(testSearchValue);
  });

  it('retrieves search query from localStorage on mount', () => {
    localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(testSearchValue));

    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(testSearchValue);
    expect(mockOnSearch).toHaveBeenCalledWith(testSearchValue);
  });

  it('clears search when input is emptied', () => {
    localStorage.setItem(SEARCH_QUERY_KEY, JSON.stringify(testSearchValue));

    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });

    expect(localStorage.getItem(SEARCH_QUERY_KEY)).toBeNull();
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('does not call onSearch on mount if localStorage is empty', () => {
    render(<Search onSearch={mockOnSearch} />);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
