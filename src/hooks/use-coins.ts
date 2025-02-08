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
        const coinsData = await Api.coins.getCoinsMarkets({ page });
        const pageNumber = Number(page);
        const totalPages = Math.ceil(totalCoins / itemsPerPage);

        // Если текущая страница — последняя, ограничиваем количество элементов
        if (pageNumber === totalPages) {
          const allowedCount = totalCoins - (pageNumber - 1) * itemsPerPage;
          setCoins(coinsData.slice(0, allowedCount));
        } else {
          setCoins(coinsData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, [page, itemsPerPage, totalCoins]);

  return { coins, isLoading, error };
};
