import { useEffect, useState } from 'react';

import { useQueryParams } from '@/hooks';
import { DefaultCoinsApiParams, QueryParams } from '@/services';
import { Coin } from '@/types';

interface SearchState {
  results: Coin[];
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  query: string;
}

export const useSearchState = () => {
  const { getParam } = useQueryParams();

  const initialState: SearchState = {
    results: [],
    isLoading: false,
    error: null,
    total: 0,
    page: Number(getParam(QueryParams.PAGE, DefaultCoinsApiParams.PAGE_NUM)),
    query: String(getParam(QueryParams.SEARCH, '')),
  };

  const [state, setState] = useState<SearchState>(initialState);

  const setLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error, total: 0, isLoading: false }));
  };

  const setResults = (results: Coin[], total: number) => {
    setState((prev) => ({
      ...prev,
      results,
      total,
      error: null,
      isLoading: false,
    }));
  };

  const setSearch = (query: string, page: number) => {
    setState((prev) => ({ ...prev, query, page }));
  };

  const setIsLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  };

  useEffect(() => {
    const currentPage = Number(getParam(QueryParams.PAGE, DefaultCoinsApiParams.PAGE_NUM));
    const currentQuery = String(getParam(QueryParams.SEARCH, ''));

    if (currentPage !== state.page || currentQuery !== state.query) {
      setState((prev) => ({
        ...prev,
        page: currentPage,
        query: currentQuery,
      }));
    }
  }, [getParam, state.page, state.query]);

  return {
    state,
    setLoading,
    setError,
    setResults,
    setSearch,
    setIsLoading,
  };
};
