import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DefaultCoinsApiParams, SearchParams } from '@/services';

export const useUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get(SearchParams.PAGE) ?? DefaultCoinsApiParams.PAGE);
  const initialSearch = searchParams.get(SearchParams.SEARCH) ?? '';

  const updateSearchParams = useCallback(
    (query: string, page: number) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (query) {
            newParams.set(SearchParams.SEARCH, query);
          } else {
            newParams.delete(SearchParams.SEARCH);
          }
          newParams.set(SearchParams.PAGE, page.toString());

          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return {
    initialPage,
    initialSearch,
    updateSearchParams,
  };
};
