import { useState } from 'react';

export function usePagination(itemsPerPage: number, totalItems: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    currentPage,
    paginate,
    itemsPerPage,
    totalPages,
  };
}
