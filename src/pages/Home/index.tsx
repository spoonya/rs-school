import React from 'react';

import { CoinTable, Container } from '@/components/shared';
import { Spinner } from '@/components/ui';
import { apiClient } from '@/services';
import { Coin } from '@/types';

export function HomePage() {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.coins.getAll();
      setCoins(data);
    } catch (err) {
      setError('The data was not loaded');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container>
        {error ? (
          <div>{error}</div>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <CoinTable items={coins} />
        )}
      </Container>
    </div>
  );
}
