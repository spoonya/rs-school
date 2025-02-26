import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useCoinCategories } from '@/hooks';
import { DefaultCoinsApiParams, SearchParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const router = useRouter();
  const { activeCategory } = useCoinCategories();

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const getCurrentPage = () => {
    const pageParam = router.query[SearchParams.PAGE];
    const urlPage = Array.isArray(pageParam)
      ? parseInt(pageParam[0], 10)
      : parseInt(pageParam || DefaultCoinsApiParams.PAGE_NUM, 10);

    return Math.max(1, Math.min(urlPage || 1, totalPages));
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    const newPage = getCurrentPage();
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [router.query]);

  useEffect(() => {
    const newPage = 1;
    setCurrentPage(newPage);

    const newQuery = { ...router.query };
    if (newPage === 1) {
      newQuery[SearchParams.PAGE] = undefined;
    } else {
      newQuery[SearchParams.PAGE] = newPage.toString();
    }

    router.replace(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [activeCategory]);

  useEffect(() => {
    const validPage = Math.min(currentPage, totalPages);
    if (validPage !== currentPage) {
      setCurrentPage(validPage);
      const newQuery = { ...router.query };
      newQuery[SearchParams.PAGE] = validPage.toString();

      router.replace(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [totalPages, currentPage]);

  const paginate = useCallback(
    (pageNumber: number) => {
      const validPage = Math.max(1, Math.min(pageNumber, totalPages));
      setCurrentPage(validPage);

      const newQuery = { ...router.query };
      if (validPage === 1) {
        newQuery[SearchParams.PAGE] = undefined;
      } else {
        newQuery[SearchParams.PAGE] = validPage.toString();
      }

      router.push(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true }
      );
    },
    [router, totalPages]
  );

  return {
    currentPage,
    paginate,
    itemsPerPage,
    totalPages,
  };
};
