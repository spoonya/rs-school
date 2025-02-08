import { CoinTable, Container, Pagination, Preloader, Search } from '@/components/shared';
import { useCoinsMarkets, usePagination, useSearch } from '@/hooks';
import { COINS_MARKETS_TOTAL, DefaultCoinsApiParams } from '@/services';

import classes from './home.module.scss';

export function HomePage() {
  const { searchResults, isSearchLoading, searchError, handleSearch } = useSearch();
  const { currentPage, paginate, itemsPerPage } = usePagination(
    Number(DefaultCoinsApiParams.PER_PAGE),
    COINS_MARKETS_TOTAL
  );
  const { coins, isLoading, error } = useCoinsMarkets(currentPage.toString(), itemsPerPage, COINS_MARKETS_TOTAL);

  const itemsToDisplay = searchResults.length > 0 ? searchResults : coins;

  return (
    <div>
      <Container>
        <Search className={classes.search} placeholder="Bitcoin, ETH, PEPE etc." onSearch={handleSearch} />
        {(error || searchError) && <div>{error ?? searchError}</div>}
        {(isLoading || isSearchLoading) && <Preloader />}
        {!error && !isLoading && !isSearchLoading && (
          <>
            <CoinTable items={itemsToDisplay} />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={COINS_MARKETS_TOTAL}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
      </Container>
    </div>
  );
}
