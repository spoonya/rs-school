import { Coin, SearchResponse } from '@/types';

import { ApiEndpoints, DefaultCoinsApiParams } from './constants';
import { apiInstance } from './instance';

export interface GetCoinsParams {
  vs_currency?: string;
  per_page?: string;
  page?: string;
}

const defaultParams: GetCoinsParams = {
  vs_currency: DefaultCoinsApiParams.CURRENCY,
  per_page: DefaultCoinsApiParams.PER_PAGE,
  page: DefaultCoinsApiParams.PAGE_NUM,
};

export const getMarkets = async (params?: GetCoinsParams): Promise<Coin[]> => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_MARKETS, {
    params: {
      ...defaultParams,
      ...params,
    },
  });

  return data;
};

export const getByName = async (names: string[], params?: GetCoinsParams): Promise<Coin[]> => {
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

export const getDetails = async (id: string) => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_DETAILS.replace(':id', id), {});

  return data;
};
