import omit from 'lodash/omit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useCoinCategories } from '@/hooks';
import { DefaultCoinsApiParams, QueryParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const router = useRouter();
  const { activeCategory } = useCoinCategories();

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const getCurrentPage = () => {
    const pageParam = router.query[QueryParams.PAGE];
    const urlPage = Array.isArray(pageParam)
      ? parseInt(pageParam[0], 10)
      : parseInt(pageParam || DefaultCoinsApiParams.PAGE_NUM, 10);

    return Math.max(1, Math.min(urlPage || 1, totalPages));
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    const newPage = getCurrentPage();
    if (newPage !== currentPage) setCurrentPage(newPage);
  }, [currentPage, router.query]);

  // Сброс страницы при изменении категории
  useEffect(() => {
    setCurrentPage(1);
    router.replace(
      {
        pathname: router.pathname,
        query: omit(router.query, QueryParams.PAGE),
      },
      undefined,
      { shallow: true }
    );
  }, [activeCategory]);

  // Корректировка текущей страницы
  useEffect(() => {
    const validPage = Math.min(currentPage, totalPages);
    if (validPage === currentPage) return;

    setCurrentPage(validPage);

    const newQuery =
      validPage === 1
        ? omit(router.query, QueryParams.PAGE)
        : { ...router.query, [QueryParams.PAGE]: validPage.toString() };

    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  }, [totalPages, currentPage]);

  const paginate = useCallback(
    (pageNumber: number) => {
      const validPage = Math.max(1, Math.min(pageNumber, totalPages));
      setCurrentPage(validPage);

      const newQuery =
        validPage === 1
          ? omit(router.query, QueryParams.PAGE)
          : { ...router.query, [QueryParams.PAGE]: validPage.toString() };

      router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
    },
    [router, totalPages]
  );

  return { currentPage, paginate, itemsPerPage, totalPages };
};
