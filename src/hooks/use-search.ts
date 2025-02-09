import { useCallback, useEffect } from 'react';

import { useQueryParams, useSearchState } from '@/hooks';
import { Api, DefaultCoinsApiParams } from '@/services';

export const useSearch = () => {
  const { setMultipleParams, clearParams } = useQueryParams();
  const { state, setSearch, setResults, setError } = useSearchState();

  const handleSearch = useCallback(
    async (
      query: string,
      itemsPerPage: number = Number(DefaultCoinsApiParams.PER_PAGE),
      page: number = Number(DefaultCoinsApiParams.PAGE_NUM)
    ) => {
      setSearch(query, page);

      try {
        if (!query.trim()) {
          setResults([], 0);
          clearParams();
          return;
        }

        const searchResponse = await Api.coins.search(query);
        const coinIds = searchResponse.coins.map((coin) => coin.id);

        if (coinIds.length === 0) {
          setResults([], 0);
          setMultipleParams({ search: query, page });
          return;
        }

        const startIndex = (page - 1) * itemsPerPage;
        const pageCoinIds = coinIds.slice(startIndex, startIndex + itemsPerPage);
        const detailedCoins = await Api.coins.getByName(pageCoinIds);

        setResults(detailedCoins, coinIds.length);
        setMultipleParams({ search: query, page });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    },
    [clearParams, setMultipleParams, setSearch, setResults, setError]
  );

  useEffect(() => {
    handleSearch(state.query, Number(DefaultCoinsApiParams.PER_PAGE), state.page);
  }, []);

  const changeSearchPage = useCallback(
    (page: number, itemsPerPage: number) => {
      handleSearch(state.query, itemsPerPage, page);
    },
    [state.query, handleSearch]
  );

  return {
    searchQuery: state.query,
    searchResults: state.results,
    isSearchLoading: state.isLoading,
    searchError: state.error,
    totalSearchResults: state.total,
    currentSearchPage: state.page,
    handleSearch,
    changeSearchPage,
  };
};
