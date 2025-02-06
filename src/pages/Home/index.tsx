import { CoinTable, Container, Preloader, Search } from '@/components/shared';
import { useAllCoins, useSearch } from '@/hooks';

import classes from './home.module.scss';

export function HomePage() {
  const { coins, isLoading, error } = useAllCoins();
  const { searchResults, isSearchLoading, searchError, handleSearch } =
    useSearch();

  return (
    <div>
      <Container>
        <Search
          className={classes.search}
          placeholder="Bitcoin, Solana, etc."
          onSearch={handleSearch}
        />
        {(error || searchError) && <div>{error ?? searchError}</div>}
        {(isLoading || isSearchLoading) && <Preloader />}
        {!error && !isLoading && !isSearchLoading && (
          <CoinTable items={searchResults.length > 0 ? searchResults : coins} />
        )}
      </Container>
    </div>
  );
}
