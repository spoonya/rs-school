import { omit } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

import { useCoinCategories } from '@/hooks';
import { CoinCategories, QueryParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const router = useRouter();
  const { activeCategory } = useCoinCategories();

  const currentPage = useMemo(() => {
    const pageParam = router.query[QueryParams.PAGE];
    return Math.max(1, Number(pageParam || 1));
  }, [router.query]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / itemsPerPage)), [totalItems, itemsPerPage]);

  const paginate = useCallback(
    (pageNumber: number) => {
      let newQuery = { ...router.query };

      if (pageNumber > 1) {
        newQuery[QueryParams.PAGE] = String(pageNumber);
      } else {
        newQuery = omit(newQuery, QueryParams.PAGE);
      }

      router.replace({ query: newQuery }, undefined, { shallow: true, scroll: false });
    },
    [router]
  );

  useEffect(() => {
    if (activeCategory !== CoinCategories.ALL) {
      const newQuery = omit(router.query, QueryParams.PAGE);

      router.replace({ query: newQuery }, undefined, { shallow: true });
    }
  }, [activeCategory]);

  return { currentPage, paginate, itemsPerPage, totalPages };
};
