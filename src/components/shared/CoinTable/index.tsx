import cn from 'classnames';
import { SearchX } from 'lucide-react';

import { Coin } from '@/types';

import { CoinItem } from '../CoinItem';
import classes from './coin.list.module.scss';

interface CoinTableProps {
  className?: string;
  items: Coin[];
}

export function CoinTable({ items, className }: Readonly<CoinTableProps>) {
  if (items.length === 0) {
    return (
      <div className={classes.noResults}>
        <SearchX size={32} className={classes.noResultsIcon} data-testid="search-x" />
        <span>No results found</span>
      </div>
    );
  }

  return (
    <div className={cn(classes.root, className)}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.center}>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>High (24h)</th>
            <th>Low (24h)</th>
            <th>24h</th>
            <th>Volume (24h)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {items.map((coin) => (
            <CoinItem key={coin.id} data={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
