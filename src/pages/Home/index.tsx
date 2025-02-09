import { SearchX } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';

import { CoinTable, Container, Pagination, Preloader, Search } from '@/components/shared';
import { useCoinsMarkets, usePagination, useSearch } from '@/hooks';
import { COINS_MARKETS_TOTAL, DefaultCoinsApiParams } from '@/services';

import classes from './home.module.scss';

export function HomePage() {
  const location = useLocation();
  const showDetails = location.pathname.includes('/details/');

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

  const renderContent = () => {
    if (isSearching) {
      if (searchResults.length === 0) {
        return (
          <div className={classes.noResults}>
            <SearchX size={32} className={classes.noResultsIcon} />
            <span>No results found</span>
          </div>
        );
      }
      return (
        <>
          <CoinTable items={searchResults} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={totalSearchResults}
            currentPage={currentSearchPage}
            paginate={(page) => changeSearchPage(page, itemsPerPage)}
          />
        </>
      );
    }
    return (
      <>
        <CoinTable items={coins} />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={COINS_MARKETS_TOTAL}
          currentPage={currentPage}
          paginate={paginate}
        />
      </>
    );
  };

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.layout}>
          <div className={`${classes.tableSection} ${showDetails ? classes.withDetails : ''}`}>
            <Search
              className={classes.search}
              placeholder="Bitcoin, ETH, PEPE etc."
              onSearch={(query) => handleSearch(query, itemsPerPage)}
            />
            {(error || searchError) && <div>{error ?? searchError}</div>}
            {(isLoading || isSearchLoading) && <Preloader />}
            {!error && !isLoading && !isSearchLoading && <>{renderContent()}</>}
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
