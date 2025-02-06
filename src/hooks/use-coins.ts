import React from 'react';

import { Api } from '@/services';
import { Coin } from '@/types';

export const useAllCoins = () => {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCoins = async () => {
      try {
        const coins = await Api.coins.getAll();
        setCoins(coins);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return { coins, isLoading, error };
};
