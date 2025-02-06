import { Coin, SearchResponse } from '@/types';

import { ApiEndpoints } from './constants';
import { apiInstance } from './instance';

interface GetCoinsParams {
  vs_currency?: string;
  per_page?: string;
}

const defaultParams: GetCoinsParams = {
  vs_currency: 'usd',
  per_page: '10',
};

export const getAll = async (params?: GetCoinsParams): Promise<Coin[]> => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_MARKETS, {
    params: {
      ...defaultParams,
      ...params,
    },
  });

  return data;
};

export const getByName = async (
  names: string[],
  params?: GetCoinsParams
): Promise<Coin[]> => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_MARKETS, {
    params: {
      ...defaultParams,
      ...params,
      ids: names.join(','),
    },
  });

  return data;
};

export const search = async (name: string): Promise<SearchResponse> => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_SEARCH, {
    params: {
      query: name,
    },
  });

  return data;
};
