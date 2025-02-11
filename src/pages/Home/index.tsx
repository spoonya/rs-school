import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import { CoinTable, Container, Pagination, Preloader, Search } from '@/components/shared';
import { useCoinsMarkets, usePagination, useSearch } from '@/hooks';
import { AppRoutes, COINS_MARKETS_TOTAL, DefaultCoinsApiParams } from '@/services';

import classes from './home.module.scss';

export function HomePage() {
  const location = useLocation();
  const showDetails = location.pathname.includes(AppRoutes.COIN_DETAILS.replace(':id', ''));
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
  const { coins, isLoading, error } = useCoinsMarkets(currentPage, itemsPerPage, COINS_MARKETS_TOTAL);

  const isSearching = Boolean(searchQuery?.trim());

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.layout}>
          <div className={cn(classes.tableSection, showDetails ? classes.withDetails : '')}>
            <Search
              className={classes.search}
              placeholder="Bitcoin, ETH, PEPE etc."
              onSearch={(query) => handleSearch(query, itemsPerPage)}
            />
            {(error || searchError) && <div>{error ?? searchError}</div>}
            {(isLoading || isSearchLoading) && <Preloader />}
            {!error && !isLoading && !isSearchLoading && (
              <>
                {isSearching ? (
                  <>
                    <CoinTable items={searchResults} />
                    {searchResults.length > 0 && (
                      <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalSearchResults}
                        currentPage={currentSearchPage}
                        paginate={(page) => changeSearchPage(page, itemsPerPage)}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <CoinTable items={coins} />
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      totalItems={COINS_MARKETS_TOTAL}
                      currentPage={currentPage}
                      paginate={paginate}
                    />
                  </>
                )}
              </>
            )}
          </div>
          {showDetails && (
            <div className={classes.detailsSection}>
              <Outlet />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
