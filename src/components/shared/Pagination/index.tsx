import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import classes from './pagination.module.scss';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export function Pagination({ itemsPerPage, totalItems, currentPage, paginate }: Readonly<PaginationProps>) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  if (pageCount <= 1) {
    return null;
  }

  const maxVisiblePages = 3;

  const getPageNumbers = () => {
    const pages = new Set<number>();

    pages.add(1);

    const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.add(i);
    }

    if (pageCount > 1) {
      pages.add(pageCount);
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handlePrevious = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pageCount) paginate(currentPage + 1);
  };

  return (
    <nav className={classes.paginationWrapper}>
      <button
        className={classes.navButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>
      <ul className={classes.pagination}>
        {getPageNumbers().map((number, index, array) => (
          <React.Fragment key={number}>
            <li className={`${classes.pageItem} ${currentPage === number ? classes.active : ''}`}>
              <button className={classes.pageButton} onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
            {index < array.length - 1 && array[index + 1] - number > 1 && <li className={classes.ellipsis}>...</li>}
          </React.Fragment>
        ))}
      </ul>
      <button
        className={classes.navButton}
        onClick={handleNext}
        disabled={currentPage === pageCount}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}
