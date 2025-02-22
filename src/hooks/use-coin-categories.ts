import { CoinCategories, COINS_MARKETS_TOTAL } from '@/services';
import { useAppSelector } from '@/store';

export function useCoinCategories() {
  const activeCategory = useAppSelector((state) => state.coinCategories.activeCategory);
  const favorites = useAppSelector((state) => state.favorites.coins);

  const getTotalItems = () => {
    switch (activeCategory) {
      case CoinCategories.FAVORITES:
        return favorites.length;
      case CoinCategories.ALL:
      default:
        return COINS_MARKETS_TOTAL;
    }
  };

  return {
    activeCategory,
    totalItems: getTotalItems(),
  };
}
