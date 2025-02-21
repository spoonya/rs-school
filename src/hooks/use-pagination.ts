import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCoinCategories, useQueryParams } from '@/hooks';
import { DefaultCoinsApiParams, SearchParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getParam } = useQueryParams();
  const { activeCategory } = useCoinCategories();

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(() => {
    const urlPage = Number(getParam(SearchParams.PAGE, DefaultCoinsApiParams.PAGE_NUM));
    return Math.max(1, Math.min(urlPage || 1, totalPages));
  });

  useEffect(() => {
    const urlPage = Number(getParam(SearchParams.PAGE, DefaultCoinsApiParams.PAGE_NUM));
    if (!isNaN(urlPage) && urlPage !== currentPage) {
      const validPage = Math.max(1, Math.min(urlPage, totalPages));
      setCurrentPage(validPage);
    }
  }, [currentPage, getParam, location.search, totalPages]);

  useEffect(() => {
    const urlPage = Number(getParam(SearchParams.PAGE, DefaultCoinsApiParams.PAGE_NUM));
    const newPage = !isNaN(urlPage) ? Math.max(1, Math.min(urlPage, totalPages)) : 1;

    setCurrentPage(newPage);
    navigate(`?${SearchParams.PAGE}=${newPage}`, { replace: true });
  }, [activeCategory, getParam, navigate, totalPages]);

  useEffect(() => {
    const validPage = Math.min(currentPage, totalPages);
    if (validPage !== currentPage) {
      setCurrentPage(validPage);
      navigate(`?${SearchParams.PAGE}=${validPage}`, { replace: true });
    }
  }, [totalPages, currentPage, navigate]);

  const paginate = useCallback(
    (pageNumber: number) => {
      const validPage = Math.max(1, Math.min(pageNumber, totalPages));
      setCurrentPage(validPage);
      navigate(`?${SearchParams.PAGE}=${validPage}`);
    },
    [navigate, totalPages]
  );

  return {
    currentPage,
    paginate,
    itemsPerPage,
    totalPages,
  };
};
