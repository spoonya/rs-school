import cn from 'classnames';

import { Coin } from '@/types';

import { CoinItem } from '../CoinItem';
import classes from './coin.list.module.scss';

interface CoinTableProps {
  className?: string;
  items: Coin[];
}

export function CoinTable({ className, items }: Readonly<CoinTableProps>) {
  return (
    <div className={cn(classes.root, className)}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={cn(classes.center)}>#</th>
            <th className={cn(classes.mainInfo, classes.left)}>Name</th>
            <th className={classes.price}>Price</th>
            <th className={classes.high24}>High (24h)</th>
            <th className={classes.low24}>Low (24h)</th>
            <th className={classes.change}>24h</th>
            <th className={classes.volume}>Volume (24h)</th>
            <th className={classes.marketCap}>Market Cap</th>
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
