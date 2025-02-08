import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Api, DefaultCoinsApiParams } from '@/services';
import { Coin } from '@/types';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') ?? DefaultCoinsApiParams.PAGE);
  const initialSearch = searchParams.get('search') ?? '';

  const [searchQuery, setSearchQuery] = React.useState(initialSearch);
  const [searchResults, setSearchResults] = React.useState<Coin[]>([]);
  const [isSearchLoading, setIsSearchLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const [totalSearchResults, setTotalSearchResults] = React.useState(0);
  const [currentSearchPage, setCurrentSearchPage] = React.useState(initialPage);

  const updateSearchParams = useCallback(
    (query: string, page: number) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (query) {
            newParams.set('search', query);
          } else {
            newParams.delete('search');
          }
          newParams.set('page', page.toString());
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleSearch = React.useCallback(
    async (query: string, itemsPerPage: number = 10, page: number = 1) => {
      setSearchQuery(query);
      if (!query.trim()) {
        setTotalSearchResults(0);
        setCurrentSearchPage(1);
        setSearchResults([]);
        updateSearchParams('', 1);

        return;
      }
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
    [updateSearchParams]
  );

  React.useEffect(() => {
    if (initialSearch && !searchResults.length) {
      handleSearch(initialSearch, 10, initialPage);
    }
  }, [initialSearch, initialPage, searchResults.length, handleSearch]);

  const changeSearchPage = useCallback(
    (page: number, itemsPerPage: number) => {
      setCurrentSearchPage(page);
      handleSearch(searchQuery, itemsPerPage, page);
    },
    [searchQuery, handleSearch]
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
