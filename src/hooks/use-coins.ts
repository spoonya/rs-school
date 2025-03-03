import { useGetMarketsQuery } from '@/services';
import { CoinsMarketsResponse } from '@/types';

export const useCoinsMarkets = (
  page: number,
  itemsPerPage: number,
  totalCoins: number,
  shouldFetch: boolean = true
) => {
  const { data, isLoading, error, isFetching } = useGetMarketsQuery(
    { page, limit: itemsPerPage },
    {
      skip: !shouldFetch,
      refetchOnMountOrArgChange: 30,
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: data ? processCoinsData(data, totalCoins) : null,
      }),
    }
  );

  return {
    coins: data?.result || [],
    isLoading: isLoading || isFetching,
    error: error ? 'Failed to load market data' : null,
  };
};

const processCoinsData = (data: CoinsMarketsResponse, totalCoins: number) => {
  return {
    ...data,
    result: data.result.slice(0, totalCoins),
  };
};
