import { CoinTable, Container, Pagination, Preloader, Search } from '@/components/shared';
import { useCoinsMarkets, usePagination, useSearch } from '@/hooks';
import { COINS_MARKETS_TOTAL, DefaultCoinsApiParams } from '@/services';

import classes from './home.module.scss';

export function HomePage() {
  const {
    searchQuery,
    searchResults,
    isSearchLoading,
    searchError,
    totalSearchResults,
    currentSearchPage,
    handleSearch,
    changeSearchPage,
  } = useSearch();

  const { currentPage, paginate, itemsPerPage } = usePagination(
    Number(DefaultCoinsApiParams.PER_PAGE),
    COINS_MARKETS_TOTAL
  );

  const { coins, isLoading, error } = useCoinsMarkets(currentPage.toString(), itemsPerPage, COINS_MARKETS_TOTAL);

  const isSearching = Boolean(searchQuery.trim());
  const itemsToDisplay = isSearching ? searchResults : coins;

  return (
    <div>
      <Container>
        <Search
          className={classes.search}
          placeholder="Bitcoin, ETH, PEPE etc."
          onSearch={(query) => handleSearch(query, itemsPerPage)}
        />
        {(error || searchError) && <div>{error ?? searchError}</div>}
        {(isLoading || isSearchLoading) && <Preloader />}
        {!error && !isLoading && !isSearchLoading && (
          <>
            <CoinTable items={itemsToDisplay} />
            {isSearching ? (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalSearchResults}
                currentPage={currentSearchPage}
                paginate={(page) => changeSearchPage(page, itemsPerPage)}
              />
            ) : (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={COINS_MARKETS_TOTAL}
                currentPage={currentPage}
                paginate={paginate}
              />
            )}
          </>
        )}
      </Container>
    </div>
  );
}
