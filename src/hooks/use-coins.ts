import React from 'react';

import { useGetMarketsQuery } from '@/services';

export const useCoinsMarkets = (
  page: number,
  itemsPerPage: number,
  totalCoins: number,
  shouldFetch: boolean = true
) => {
  const { data, isFetching, error } = useGetMarketsQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
      skip: !shouldFetch,
    }
  );

  const processedCoins = React.useMemo(() => {
    if (!data?.result) return [];

    const pageNumber = Number(page);
    const totalPages = Math.ceil(totalCoins / itemsPerPage);

    if (pageNumber === totalPages) {
      const allowedCount = totalCoins - (pageNumber - 1) * itemsPerPage;
      return data.result.slice(0, allowedCount);
    }

    return data.result;
  }, [data, page, itemsPerPage, totalCoins]);

  return {
    coins: processedCoins,
    isLoading: isFetching,
    error: error ? 'An error occurred while fetching coins' : null,
  };
};
