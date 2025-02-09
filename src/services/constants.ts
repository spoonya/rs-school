import { createCoinsMarketsTotal } from '@/utils';

const prefix = 'nexum';

export const SEARCH_QUERY_KEY = `${prefix}-search-query`;

export enum AppRoutes {
  HOME = '/',
  COIN_DETAILS = 'details/:id',
}

export const API_URL = 'https://api.coingecko.com/api/v3';

export enum ApiEndpoints {
  COINS_MARKETS = '/coins/markets',
  COINS_SEARCH = '/search',
  COINS_DETAILS = '/coins/:id',
}

export const COINS_MARKETS_TOTAL = createCoinsMarketsTotal(250);

export enum DefaultCoinsApiParams {
  CURRENCY = 'usd',
  PER_PAGE = '15',
  PAGE_NUM = '1',
}

export enum SearchParams {
  SEARCH = 'search',
  PAGE = 'page',
  ID = 'id',
}
