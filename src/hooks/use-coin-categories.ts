import { useMemo } from 'react';

import { CoinCategories, COINS_MARKETS_TOTAL } from '@/services';
import { useAppSelector } from '@/store';

export function useCoinCategories(initialCategory?: CoinCategories) {
  const activeCategory = useAppSelector(
    (state) => state.coinCategories.activeCategory || initialCategory || CoinCategories.ALL
  );

  const favorites = useAppSelector((state) => state.favorites.coins);

  const totalItems = useMemo(() => {
    return activeCategory === CoinCategories.FAVORITES ? favorites.length : COINS_MARKETS_TOTAL;
  }, [activeCategory, favorites.length]);

  return {
    activeCategory,
    totalItems,
  };
}
