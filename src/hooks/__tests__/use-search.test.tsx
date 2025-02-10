import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearch } from '@/hooks';
import { Api, DefaultCoinsApiParams } from '@/services';
import { renderHook, waitFor } from '@testing-library/react';

import type { Mock } from 'vitest';

// Мокаем зависимости
vi.mock('@/services', () => ({
  Api: {
    coins: {
      search: vi.fn(),
      getByName: vi.fn(),
    },
  },
  DefaultCoinsApiParams: {
    PER_PAGE: '10',
    PAGE_NUM: '1',
    CURRENCY: 'usd',
  },
}));

vi.mock('@/hooks/use-query-params', () => ({
  useQueryParams: () => ({
    setMultipleParams: vi.fn(),
    clearParams: vi.fn(),
  }),
}));

const mockSetSearch = vi.fn();
const mockSetResults = vi.fn();
const mockSetError = vi.fn();
let mockSearchState = {
  query: '',
  results: [],
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
};

vi.mock('@/hooks/use-search-state', () => ({
  useSearchState: () => ({
    state: mockSearchState,
    setSearch: mockSetSearch,
    setResults: mockSetResults,
    setError: mockSetError,
  }),
}));

describe('useSearch', () => {
  const mockSearchResponse = {
    coins: [
      { id: 'bitcoin', name: 'Bitcoin' },
      { id: 'ethereum', name: 'Ethereum' },
    ],
  };

  const mockDetailedCoins = [
    { id: 'bitcoin', name: 'Bitcoin', price: 50000 },
    { id: 'ethereum', name: 'Ethereum', price: 3000 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchState = {
      query: '',
      results: [],
      isLoading: false,
      error: null,
      total: 0,
      page: 1,
    };
  });

  it('should perform search with valid query', async () => {
    (Api.coins.search as Mock).mockResolvedValueOnce(mockSearchResponse);
    (Api.coins.getByName as Mock).mockResolvedValueOnce(mockDetailedCoins);

    const { result } = renderHook(() => useSearch());

    await result.current.handleSearch('bitcoin');

    expect(Api.coins.search).toHaveBeenCalledWith('bitcoin');
    expect(Api.coins.getByName).toHaveBeenCalledWith(['bitcoin', 'ethereum']);
  });

  it('should clear search results when query is empty', async () => {
    const { result } = renderHook(() => useSearch());

    await result.current.handleSearch('');

    expect(Api.coins.search).not.toHaveBeenCalled();
    expect(Api.coins.getByName).not.toHaveBeenCalled();
  });

  it('should handle empty search results', async () => {
    (Api.coins.search as Mock).mockResolvedValueOnce({ coins: [] });

    const { result } = renderHook(() => useSearch());

    await result.current.handleSearch('nonexistent');

    expect(Api.coins.search).toHaveBeenCalledWith('nonexistent');
    expect(Api.coins.getByName).not.toHaveBeenCalled();
  });

  it('should handle search error', async () => {
    const error = new Error('API Error');
    (Api.coins.search as Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useSearch());

    await result.current.handleSearch('bitcoin');

    expect(Api.coins.search).toHaveBeenCalledWith('bitcoin');
    expect(Api.coins.getByName).not.toHaveBeenCalled();
  });

  it('should change search page', async () => {
    mockSearchState.query = 'bitcoin';
    (Api.coins.search as Mock).mockResolvedValueOnce(mockSearchResponse);
    (Api.coins.getByName as Mock).mockResolvedValueOnce(mockDetailedCoins);

    const { result } = renderHook(() => useSearch());

    result.current.changeSearchPage(2, Number(DefaultCoinsApiParams.PER_PAGE));

    await waitFor(() => {
      expect(Api.coins.search).toHaveBeenCalledWith('bitcoin');
      expect(mockSetSearch).toHaveBeenCalledWith('bitcoin', 2);
      expect(Api.coins.getByName).toHaveBeenCalledWith(['bitcoin', 'ethereum']);
    });
  });

  it('should handle pagination with custom items per page', async () => {
    (Api.coins.search as Mock).mockResolvedValueOnce(mockSearchResponse);
    (Api.coins.getByName as Mock).mockResolvedValueOnce([mockDetailedCoins[0]]);

    const { result } = renderHook(() => useSearch());

    await result.current.handleSearch('bitcoin', 1, 2);

    expect(Api.coins.search).toHaveBeenCalledWith('bitcoin');
    expect(Api.coins.getByName).toHaveBeenCalledWith(['ethereum']);
  });
});
