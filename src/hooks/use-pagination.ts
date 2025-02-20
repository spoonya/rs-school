import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCoinCategories, useQueryParams } from '@/hooks';
import { DefaultCoinsApiParams, SearchParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getParam, setParam } = useQueryParams();
  const { activeCategory } = useCoinCategories();

  const initialPage = Number(getParam(SearchParams.PAGE, DefaultCoinsApiParams.PAGE_NUM));
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, totalItems]);

  const paginate = useCallback(
    (pageNumber: number) => {
      const validPage = Math.max(1, Math.min(pageNumber, totalPages));
      setCurrentPage(validPage);
      setParam(SearchParams.PAGE, validPage);
      navigate(`${location.pathname}?${SearchParams.PAGE}=${validPage}`);
    },
    [location, navigate, totalPages, setParam]
  );

  return {
    currentPage,
    paginate,
    itemsPerPage,
    totalPages,
  };
};
