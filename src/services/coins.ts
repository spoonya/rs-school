import { CoinsMarketsResponse } from '@/types';

import { ApiEndpoints, DefaultCoinsApiParams } from './constants';
import { apiInstance } from './instance';

export interface GetCoinsParams {
  limit?: number;
  currency?: string;
  page?: number;
}

const defaultParams: GetCoinsParams = {
  limit: Number(DefaultCoinsApiParams.PER_PAGE),
  currency: DefaultCoinsApiParams.CURRENCY,
  page: Number(DefaultCoinsApiParams.PAGE_NUM),
};

export const getMarkets = async (params?: GetCoinsParams): Promise<CoinsMarketsResponse> => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_MARKETS, {
    params: {
      ...defaultParams,
      ...params,
    },
  });

  return data;
};

export const getByName = async (name: string, params?: GetCoinsParams): Promise<CoinsMarketsResponse> => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_MARKETS, {
    params: {
      ...defaultParams,
      ...params,
      name,
    },
  });

  return data;
};

export const getDetails = async (id: string) => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_DETAILS.replace(':id', id), {});

  return data;
};
