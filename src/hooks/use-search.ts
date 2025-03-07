import { useCallback, useEffect } from 'react';

import { useQueryParams, useSearchState } from '@/hooks';
import { DefaultCoinsApiParams, useSearchQuery } from '@/services';

export const useSearch = () => {
  const { setMultipleParams } = useQueryParams();
  const { state, setSearch } = useSearchState();

  const handleSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      setSearch(trimmedQuery, 1);
      setMultipleParams({
        search: trimmedQuery || undefined,
        page: undefined,
      });
    },
    [setSearch, setMultipleParams]
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

  useEffect(() => {
    if (!isFetching && data) {
      if (data.meta.page > data.meta.pageCount && data.meta.pageCount > 0) {
        changeSearchPage(data.meta.pageCount);
      }
    }
  }, [isFetching, data]);

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
