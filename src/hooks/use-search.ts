import React from 'react';

import { Api } from '@/services';
import { Coin } from '@/types';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [allCoinIds, setAllCoinIds] = React.useState<string[]>([]);
  const [searchResults, setSearchResults] = React.useState<Coin[]>([]);
  const [isSearchLoading, setIsSearchLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const [totalSearchResults, setTotalSearchResults] = React.useState(0);
  const [currentSearchPage, setCurrentSearchPage] = React.useState(1);

  const handleSearch = React.useCallback(async (query: string, itemsPerPage: number = 10) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setAllCoinIds([]);
      setSearchResults([]);
      setTotalSearchResults(0);
      return;
    }
    try {
      setIsSearchLoading(true);

      const searchResponse = await Api.coins.search(query);
      const coinIds = searchResponse.coins.map((coin) => coin.id);
      setAllCoinIds(coinIds);
      setTotalSearchResults(coinIds.length);

      const page = 1;
      const startIndex = (page - 1) * itemsPerPage;
      const pageCoinIds = coinIds.slice(startIndex, startIndex + itemsPerPage);
      const detailedCoins = await Api.coins.getByName(pageCoinIds);
      setSearchResults(detailedCoins);
      setCurrentSearchPage(page);
      setSearchError(null);
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : 'An error occurred');
      setAllCoinIds([]);
      setSearchResults([]);
      setTotalSearchResults(0);
    } finally {
      setIsSearchLoading(false);
    }
  }, []);

  const changeSearchPage = React.useCallback(
    async (page: number, itemsPerPage: number = 10) => {
      try {
        setIsSearchLoading(true);
        const startIndex = (page - 1) * itemsPerPage;
        const pageCoinIds = allCoinIds.slice(startIndex, startIndex + itemsPerPage);
        const detailedCoins = await Api.coins.getByName(pageCoinIds);
        setSearchResults(detailedCoins);
        setCurrentSearchPage(page);
        setSearchError(null);
      } catch (error) {
        setSearchError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsSearchLoading(false);
      }
    },
    [allCoinIds]
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
