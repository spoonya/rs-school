import {
  CoinTable,
  Container,
  Pagination,
  Preloader,
  Search,
} from '@/components/shared';
import { useAllCoins, useSearch } from '@/hooks';
import { usePagination } from '@/hooks/use-pagination';

import classes from './home.module.scss';

export function HomePage() {
  const { coins, isLoading, error } = useAllCoins();
  const { searchResults, isSearchLoading, searchError, handleSearch } =
    useSearch();
  const { currentPage, paginate, getPaginatedItems, itemsPerPage } =
    usePagination(5);

  const itemsToDisplay = searchResults.length > 0 ? searchResults : coins;
  const paginatedItems = getPaginatedItems(itemsToDisplay);

  return (
    <div>
      <Container>
        <Search
          className={classes.search}
          placeholder="Bitcoin, ETH, PEPE etc."
          onSearch={handleSearch}
        />
        {(error || searchError) && <div>{error ?? searchError}</div>}
        {(isLoading || isSearchLoading) && <Preloader />}
        {!error && !isLoading && !isSearchLoading && (
          <>
            <CoinTable items={paginatedItems} />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={itemsToDisplay.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
      </Container>
    </div>
  );
}
