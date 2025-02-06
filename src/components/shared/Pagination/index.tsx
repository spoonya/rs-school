import classes from './pagination.module.scss';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}: Readonly<PaginationProps>) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 3;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  return (
    <nav className={classes.paginationWrapper}>
      <button
        className={classes.navButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <ul className={classes.pagination}>
        {getPageNumbers().map((number) => (
          <li
            key={number}
            className={`${classes.pageItem} ${
              currentPage === number ? classes.active : ''
            }`}
          >
            <button
              className={classes.pageButton}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {totalPages > maxVisiblePages && currentPage < totalPages - 1 && (
          <li className={classes.ellipsis}>...</li>
        )}
      </ul>
      <button
        className={classes.navButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </nav>
  );
}
