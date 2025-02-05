import { Coin } from '@/types';

import { ApiEndpoints } from './constants';
import { apiInstance } from './instance';

interface GetCoinsParams {
  vs_currency?: string;
  price_change_percentage?: string;
  per_page?: string;
}

const defaultParams: GetCoinsParams = {
  vs_currency: 'usd',
  price_change_percentage: '1h%2C24h%2C7d',
  per_page: '20',
};

export const getAll = async (
  params: GetCoinsParams = defaultParams
): Promise<Coin[]> => {
  const { data } = await apiInstance.get(ApiEndpoints.COINS_MARKETS, {
    params,
  });
  return data;
};

export const getById = async (id: string): Promise<Coin> => {
  const { data } = await apiInstance.get(
    ApiEndpoints.COINS_BY_ID.replace(':id', id)
  );
  return data;
};
