import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useQueryParams } from '@/hooks';
import { DefaultCoinsApiParams, SearchParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getParam, setParam } = useQueryParams();

  const initialPage = Number(getParam(SearchParams.PAGE, DefaultCoinsApiParams.PAGE));

  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = useCallback(
    (pageNumber: number) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        setParam(SearchParams.PAGE, pageNumber);
        navigate(`${location.pathname}?${SearchParams.PAGE}=${pageNumber}`);
      }
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
