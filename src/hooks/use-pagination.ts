import { useCallback, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { DefaultCoinsApiParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') ?? DefaultCoinsApiParams.PAGE);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = useCallback(
    (pageNumber: number) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        setSearchParams((prev) => {
          prev.set('page', pageNumber.toString());

          return prev;
        });
        navigate(`${location.pathname}?${searchParams.toString()}`);
      }
    },
    [location, navigate, totalPages, searchParams, setSearchParams]
  );

  return {
    currentPage,
    paginate,
    itemsPerPage,
    totalPages,
  };
};
