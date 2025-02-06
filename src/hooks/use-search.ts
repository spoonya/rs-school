import React from 'react';

import { Api } from '@/services';
import { Coin } from '@/types';

export const useSearch = () => {
  const [searchResults, setSearchResults] = React.useState<Coin[]>([]);
  const [isSearchLoading, setIsSearchLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState<string | null>(null);

  const handleSearch = React.useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearchLoading(true);
      const coins = await Api.coins.getByName([query]);
      setSearchResults(coins);
      setSearchError(null);
    } catch (error) {
      setSearchError(
        error instanceof Error ? error.message : 'An error occurred'
      );
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  }, []);

  return {
    searchResults,
    isSearchLoading,
    searchError,
    handleSearch,
  };
};
