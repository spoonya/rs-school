import { useCallback, useEffect, useRef } from 'react';

import { useQueryParams, useSearchState } from '@/hooks';
import { DefaultCoinsApiParams } from '@/services';
import { useGetByNameQuery } from '@/services/api';
import { skipToken } from '@reduxjs/toolkit/query/react';

export const useSearch = () => {
  const { setMultipleParams, clearParams } = useQueryParams();
  const { state, setSearch, setResults, setError, setIsLoading } = useSearchState();
  const prevIsFetching = useRef(false);

  const handleSearch = useCallback(
    (query: string, page: number = Number(DefaultCoinsApiParams.PAGE_NUM)) => {
      const trimmedQuery = query.trim();
      setSearch(trimmedQuery, page);

      if (!trimmedQuery) {
        setResults([], 0);
        clearParams();
        return;
      }

      setMultipleParams({ search: trimmedQuery, page });
    },
    [clearParams, setMultipleParams, setSearch, setResults]
  );

  const { data, error, isFetching } = useGetByNameQuery(
    state.query
      ? {
          name: state.query,
          page: state.page,
          limit: Number(DefaultCoinsApiParams.PER_PAGE),
        }
      : skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isFetching !== prevIsFetching.current) {
      prevIsFetching.current = isFetching;
      setIsLoading(isFetching);
    }

    if (error) {
      setError('Failed to fetch search results');
      setResults([], 0);
    } else if (data) {
      setResults(data.result, data.meta.itemCount);
    }
  }, [data, error, isFetching, setError, setIsLoading, setResults]);

  const changeSearchPage = useCallback(
    (page: number) => {
      if (state.query) {
        setSearch(state.query, page);
        setMultipleParams({ search: state.query, page });
      }
    },
    [state.query, setSearch, setMultipleParams]
  );

  return {
    searchQuery: state.query,
    searchResults: state.results,
    isSearchLoading: isFetching,
    searchError: state.error,
    totalSearchResults: state.total,
    currentSearchPage: state.page,
    handleSearch,
    changeSearchPage,
  };
};
