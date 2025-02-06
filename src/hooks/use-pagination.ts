import { useState } from 'react';

export function usePagination(itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPaginatedItems = <T>(items: T[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    paginate,
    getPaginatedItems,
    itemsPerPage,
  };
}
