import { useCallback, useEffect } from 'react';

import { useQueryParams, useSearchState } from '@/hooks';
import { Api, DefaultCoinsApiParams } from '@/services';

export const useSearch = () => {
  const { setMultipleParams, clearParams } = useQueryParams();
  const { state, setSearch, setResults, setError, setIsLoading } = useSearchState();

  const handleSearch = useCallback(
    async (
      query: string,
      itemsPerPage: number = Number(DefaultCoinsApiParams.PER_PAGE),
      page: number = Number(DefaultCoinsApiParams.PAGE_NUM)
    ) => {
      setIsLoading(true);
      const trimmedQuery = query.trim();
      setSearch(trimmedQuery, page);

      try {
        if (!trimmedQuery) {
          setResults([], 0);
          clearParams();
          setIsLoading(false);
          return;
        }

        const response = await Api.coins.getByName(trimmedQuery, {
          page,
          limit: itemsPerPage,
        });

        if (response.result.length === 0) {
          setResults([], 0);
          setMultipleParams({ search: trimmedQuery, page });
          setIsLoading(false);
          return;
        }

        setResults(response.result, response.meta.itemCount);
        setMultipleParams({ search: trimmedQuery, page });
        setIsLoading(false);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch search results';
        setError(errorMessage);
        setResults([], 0);
        setIsLoading(false);
      }
    },
    [clearParams, setMultipleParams, setSearch, setResults, setError, setIsLoading]
  );

  useEffect(() => {
    if (state.query) {
      handleSearch(state.query, Number(DefaultCoinsApiParams.PER_PAGE), state.page);
    }
  }, [state.query]);

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
