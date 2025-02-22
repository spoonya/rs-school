import cn from 'classnames';

import { CoinItem } from '@/components/shared';
import { Coin } from '@/types';

import classes from './coin.table.module.scss';

interface CoinTableProps {
  className?: string;
  items: Coin[];
}

export function CoinTable({ items, className }: Readonly<CoinTableProps>) {
  return (
    <div className={cn(classes.root, className)}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.center} aria-label="Favorite"></th>
            <th className={classes.center}>#</th>
            <th className={classes.left}>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>1d</th>
            <th>1w</th>
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
