import React from 'react';

import { Api } from '@/services';
import { Coin } from '@/types';

export const useCoinsMarkets = (page: string, itemsPerPage: number, totalCoins: number) => {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const coinsData = await Api.coins.getMarkets({ page });
        const pageNumber = Number(page);
        const totalPages = Math.ceil(totalCoins / itemsPerPage);

        if (pageNumber === totalPages) {
          const allowedCount = totalCoins - (pageNumber - 1) * itemsPerPage;
          setCoins(coinsData.slice(0, allowedCount));
        } else {
          setCoins(coinsData);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        setCoins([]);
        console.error('API Error:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, [page, itemsPerPage, totalCoins]);

  return { coins, isLoading, error };
};
