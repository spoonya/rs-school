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

        const params = trimmedQuery ? { search: trimmedQuery } : {};

        setMultipleParams(params);

        if (!trimmedQuery) clearParams();
      }
    },
    [state.query, setSearch, setMultipleParams, clearParams]
  );

  const changeSearchPage = useCallback(
    (page: number) => {
      if (page !== state.page) {
        setSearch(state.query, page);

        setMultipleParams({
          ...(state.query && { search: state.query }),
          ...(page > 1 && { page }),
        });
      }
    },
    [state.query, state.page, setSearch, setMultipleParams]
  );

  const { data, error, isFetching } = useSearchQuery(
    {
      query: state.query,
      page: state.page,
      limit: Number(DefaultCoinsApiParams.PER_PAGE),
    },
    { skip: !state.query }
  );

  return {
    searchQuery: state.query,
    searchResults: data?.result ?? [],
    isSearchLoading: isFetching,
    searchError: error,
    totalSearchResults: data?.meta.itemCount ?? 0,
    currentSearchPage: state.page,
    handleSearch,
    changeSearchPage,
  };
};
