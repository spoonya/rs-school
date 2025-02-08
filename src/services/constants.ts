import { createCoinsMarketsTotal } from '@/utils';

export enum AppRoutes {
  HOME = '/',
}

export const API_URL = 'https://api.coingecko.com/api/v3';

export enum ApiEndpoints {
  COINS_MARKETS = '/coins/markets',
  COINS_SEARCH = '/search',
}

const prefix = 'nexum';

export const SEARCH_QUERY_KEY = `${prefix}-search-query`;

export const COINS_MARKETS_TOTAL = createCoinsMarketsTotal(250);

export enum DefaultCoinsApiParams {
  CURRENCY = 'usd',
  PER_PAGE = '8',
  PAGE = '1',
}

export enum SearchParams {
  SEARCH = 'search',
  PAGE = 'page',
}
