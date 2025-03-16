import { useCallback } from 'react';

import { useQueryParams, useSearchState } from '@/hooks';
import { DefaultCoinsApiParams, useSearchQuery } from '@/services';

export const useSearch = () => {
  const { setMultipleParams, clearParams } = useQueryParams();
  const { state, setSearch } = useSearchState();

  const handleSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      if (trimmedQuery !== state.query) {
        setSearch(trimmedQuery, 1);
        if (trimmedQuery) {
          setMultipleParams({ search: trimmedQuery, page: 1 });
        } else {
          clearParams();
        }
      }
    },
    [state.query, setSearch, setMultipleParams, clearParams]
  );

  const changeSearchPage = useCallback(
    (page: number) => {
      if (page !== state.page) {
        setSearch(state.query, page);
        setMultipleParams({ search: state.query, page });
      }
    },
    [state.query, state.page, setSearch, setMultipleParams]
  );

  const {
    data: searchData,
    error: searchError,
    isFetching,
  } = useSearchQuery(
    {
      query: state.query,
      page: state.page,
      limit: Number(DefaultCoinsApiParams.PER_PAGE),
    },
    { skip: state.query.length === 0 }
  );

  return {
    searchQuery: state.query,
    searchResults: searchData?.result ?? [],
    isSearchLoading: isFetching,
    searchError,
    totalSearchResults: searchData?.meta.itemCount ?? 0,
    currentSearchPage: state.page,
    handleSearch,
    changeSearchPage,
  };
};
