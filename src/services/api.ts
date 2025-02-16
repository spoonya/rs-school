import { Coin, CoinDetails, CoinsMarketsResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints, DefaultCoinsApiParams } from './constants';

export interface GetCoinsParams {
  limit?: number;
  currency?: string;
  page?: number;
  name?: string;
  symbol?: string;
}

const defaultParams: GetCoinsParams = {
  limit: Number(DefaultCoinsApiParams.PER_PAGE),
  currency: DefaultCoinsApiParams.CURRENCY,
  page: Number(DefaultCoinsApiParams.PAGE_NUM),
};

export const api = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', import.meta.env.VITE_OPENAPI_API_KEY);
      headers.set('accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMarkets: builder.query<CoinsMarketsResponse, GetCoinsParams>({
      query: (params) => ({
        url: ApiEndpoints.COINS_MARKETS,
        params: {
          ...defaultParams,
          ...params,
        },
      }),
      transformResponse: (response: { result: Coin[]; meta: CoinsMarketsResponse['meta'] }) => response,
    }),
    getByName: builder.query<CoinsMarketsResponse, { name: string } & Partial<GetCoinsParams>>({
      query: ({ name, ...params }) => ({
        url: ApiEndpoints.COINS_MARKETS,
        params: {
          ...defaultParams,
          ...params,
          name,
        },
      }),
      transformResponse: (response: { result: Coin[]; meta: CoinsMarketsResponse['meta'] }) => response,
    }),
    getBySymbol: builder.query<CoinsMarketsResponse, { symbol: string } & Partial<GetCoinsParams>>({
      query: ({ symbol, ...params }) => ({
        url: ApiEndpoints.COINS_MARKETS,
        params: {
          ...defaultParams,
          ...params,
          symbol,
        },
      }),
      transformResponse: (response: { result: Coin[]; meta: CoinsMarketsResponse['meta'] }) => response,
    }),
    getCoinDetails: builder.query<CoinDetails, string>({
      query: (id) => ApiEndpoints.COINS_DETAILS.replace(':id', id),
    }),
  }),
});

export const { useGetMarketsQuery, useGetByNameQuery, useGetBySymbolQuery, useGetCoinDetailsQuery } = api;
