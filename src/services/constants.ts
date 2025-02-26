import { createCoinsMarketsTotal } from '@/utils';

const prefix = 'nexum';

export enum AppRoutes {
  HOME = '/',
  COIN_DETAILS = 'details/[id]',
}

export enum ApiEndpoints {
  COINS_MARKETS = '/coins',
  COINS_DETAILS = '/coins/:id',
}

export enum DefaultCoinsApiParams {
  CURRENCY = 'usd',
  PER_PAGE = '10',
  PAGE_NUM = '1',
}

export enum SearchParams {
  SEARCH = 'search',
  PAGE = 'page',
  ID = 'id',
}

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum CoinCategories {
  ALL = 'all',
  FAVORITES = 'favorites',
}

export const coinCategories = [
  { label: 'All', value: CoinCategories.ALL },
  { label: 'Favorites', value: CoinCategories.FAVORITES },
];

export const DEFAULT_CATEGORY = CoinCategories.ALL;
export const COINS_MARKETS_TOTAL = createCoinsMarketsTotal(1000);
export const SEARCH_QUERY_KEY = `${prefix}-search-query`;
export const THEME_KEY = `${prefix}-theme`;
export const FAVORITES_KEY = `${prefix}-favorites`;
