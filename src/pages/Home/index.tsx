import cn from 'classnames';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  CoinCategoriesList,
  CoinTable,
  Container,
  FlyoutFavorites,
  NoResults,
  Pagination,
  Preloader,
  Search,
} from '@/components/shared';
import { useCoinCategories, useCoinsMarkets, usePagination, useSearch } from '@/hooks';
import { AppRoutes, CoinCategories, DefaultCoinsApiParams } from '@/services';
import { useAppSelector } from '@/store';

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

  const { activeCategory, totalItems } = useCoinCategories();
  const { currentPage, paginate, itemsPerPage } = usePagination(Number(DefaultCoinsApiParams.PER_PAGE), totalItems);
  const favorites = useAppSelector((state) => state.favorites.coins);

  const { coins, isLoading, error } = useCoinsMarkets(
    currentPage,
    itemsPerPage,
    totalItems,
    activeCategory === CoinCategories.ALL
  );

  const paginatedFavorites = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return favorites.slice(startIndex, endIndex);
  }, [favorites, currentPage, itemsPerPage]);

  const coinsByCategory = {
    [CoinCategories.ALL]: coins,
    [CoinCategories.FAVORITES]: paginatedFavorites,
  };

  const isSearching = Boolean(searchQuery?.trim());
  const coinsToRender = coinsByCategory[activeCategory] || [];
  const hasError = Boolean(error ?? searchError);
  const isLoadingState = isLoading || isSearchLoading;

  const renderContent = () => {
    if (hasError) {
      return <div className={classes.error}>{JSON.stringify(error ?? searchError)}</div>;
    }

    if (isLoadingState) {
      return <Preloader />;
    }

    return (
      <>
        <CoinCategoriesList className={classes.coinCategories} />
        {isSearching ? (
          <>
            {searchResults.length > 0 ? (
              <>
                <CoinTable items={searchResults} />
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={totalSearchResults}
                  currentPage={currentSearchPage}
                  paginate={changeSearchPage}
                />
              </>
            ) : (
              <NoResults text="No results found" />
            )}
          </>
        ) : (
          <>
            {coinsToRender.length > 0 ? (
              <>
                <CoinTable items={coinsToRender} />
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            ) : (
              <NoResults text="List is empty" />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.layout}>
          <div
            className={cn(classes.tableSection, {
              [classes.withDetails]: showDetails,
            })}
          >
            <Search className={classes.search} placeholder="Bitcoin, ETH, PEPE etc." onSearch={handleSearch} />
            <FlyoutFavorites />
            {renderContent()}
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
