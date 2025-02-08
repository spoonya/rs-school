import { useEffect, useState } from 'react';

import { Api } from '@/services';
import { CoinDetails } from '@/types';

export function useCoinDetails(id: string | undefined) {
  const [data, setData] = useState<CoinDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      if (!id) {
        setError('No coin ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await Api.coins.getDetails(id);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coin details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoinDetails();

    return () => {
      setData(null);
      setError(null);
    };
  }, [id]);

  return { data, isLoading, error };
}
