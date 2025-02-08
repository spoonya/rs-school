import React, { useCallback } from 'react';

import { useQueryParams } from '@/hooks';
import { Api, DefaultCoinsApiParams } from '@/services';
import { Coin } from '@/types';

export const useSearch = () => {
  const { getParam, setMultipleParams, clearParams } = useQueryParams();

  const initialPage = Number(getParam('page', DefaultCoinsApiParams.PAGE));
  const initialSearch = String(getParam('search', ''));

  const [searchQuery, setSearchQuery] = React.useState(initialSearch);
  const [searchResults, setSearchResults] = React.useState<Coin[]>([]);
  const [isSearchLoading, setIsSearchLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const [totalSearchResults, setTotalSearchResults] = React.useState(0);
  const [currentSearchPage, setCurrentSearchPage] = React.useState(initialPage);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setTotalSearchResults(0);
    setCurrentSearchPage(1);
    clearParams();
  }, [clearParams]);

  const updateSearchParams = useCallback(
    (query: string, page: number) => {
      if (!query.trim()) {
        clearSearch();
        return;
      }

      setMultipleParams({
        search: query,
        page: page,
      });
    },
    [setMultipleParams, clearSearch]
  );

  const handleSearch = React.useCallback(
    async (query: string, itemsPerPage: number = 10, page: number = 1) => {
      if (!query.trim()) {
        clearSearch();
        return;
      }

      setSearchQuery(query);
      try {
        setIsSearchLoading(true);
        const searchResponse = await Api.coins.search(query);
        const coinIds = searchResponse.coins.map((coin) => coin.id);
        setTotalSearchResults(coinIds.length);

        const startIndex = (page - 1) * itemsPerPage;
        const pageCoinIds = coinIds.slice(startIndex, startIndex + itemsPerPage);
        const detailedCoins = await Api.coins.getByName(pageCoinIds);
        setSearchResults(detailedCoins);
        setCurrentSearchPage(page);
        setSearchError(null);

        updateSearchParams(query, page);
      } catch (error) {
        setSearchError(error instanceof Error ? error.message : 'An error occurred');
        setTotalSearchResults(0);
      } finally {
        setIsSearchLoading(false);
      }
    },
    [updateSearchParams, clearSearch]
  );

  React.useEffect(() => {
    if (initialSearch) {
      handleSearch(initialSearch, 10, initialPage);
    }
  }, []);

  const changeSearchPage = useCallback(
    (page: number, itemsPerPage: number) => {
      if (!searchQuery.trim()) {
        clearSearch();
        return;
      }
      setCurrentSearchPage(page);
      handleSearch(searchQuery, itemsPerPage, page);
    },
    [searchQuery, handleSearch, clearSearch]
  );

  return {
    searchQuery,
    searchResults,
    isSearchLoading,
    searchError,
    totalSearchResults,
    currentSearchPage,
    handleSearch,
    changeSearchPage,
  };
};
