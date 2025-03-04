'use client';

import cn from 'classnames';
import React, { useEffect, useMemo } from 'react';

import {
  CoinCategoriesList,
  CoinDetails,
  CoinTable,
  Container,
  FlyoutFavorites,
  NoResults,
  Pagination,
  Preloader,
  Search,
} from '@/components/shared';
import { useCoinCategories, useCoinsMarkets, usePagination, useQueryParams, useSearch } from '@/hooks';
import { LayoutDefault } from '@/layouts';
import { CoinCategories, DefaultCoinsApiParams, QueryParams } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store';
import { initializeFavorites } from '@/store/favorites/slice';
import classes from '@/styles/home.module.scss';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { getParam } = useQueryParams();
  const favorites = useAppSelector((state) => state.favorites.coins);
  const { activeCategory, totalItems: totalMarketItems } = useCoinCategories();

  const coinId = getParam(QueryParams.DETAILS, '');
  const showDetails = Boolean(coinId);

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

  const paginationTotalItems = activeCategory === CoinCategories.ALL ? totalMarketItems : favorites.length;

  const { currentPage, paginate, itemsPerPage } = usePagination(
    Number(DefaultCoinsApiParams.PER_PAGE),
    paginationTotalItems
  );

  const { coins, isLoading, error } = useCoinsMarkets(
    currentPage,
    itemsPerPage,
    totalMarketItems,
    activeCategory === CoinCategories.ALL
  );

  const paginatedFavorites = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return favorites.slice(startIndex, startIndex + itemsPerPage);
  }, [favorites, currentPage, itemsPerPage]);

  const coinsToRender = useMemo(() => {
    if (activeCategory === CoinCategories.FAVORITES) return paginatedFavorites;
    return coins;
  }, [activeCategory, coins, paginatedFavorites]);

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  const isSearching = Boolean(searchQuery?.trim());
  const hasError = Boolean(error ?? searchError);
  const isLoadingState = isLoading || isSearchLoading;

  const renderContent = () => {
    if (hasError) {
      return <div className={classes.error}>{error?.toString() || searchError?.toString()}</div>;
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
                  totalItems={activeCategory === CoinCategories.ALL ? totalMarketItems : favorites.length}
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
    <LayoutDefault>
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
                <CoinDetails coinId={coinId} />
              </div>
            )}
          </div>
        </Container>
      </div>
    </LayoutDefault>
  );
}
