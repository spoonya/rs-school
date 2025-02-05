import cn from 'classnames';

import { Coin } from '@/types';
import { formatNumber, formatPercent } from '@/utils';

import classes from './coin.item.module.scss';

interface CoinItemProps {
  className?: string;
  data: Coin;
}

export function CoinItem({ data, className }: Readonly<CoinItemProps>) {
  return (
    <tr className={cn(classes.root, className)}>
      <td className={classes.center}>{data.market_cap_rank}</td>
      <td className={classes.mainInfo}>
        <img src={data.image} alt={data.name} className={classes.logo} />
        <div className={classes.nameBlock}>
          <span className={classes.name}>{data.name}</span>
          <span className={classes.symbol}>{data.symbol}</span>
        </div>
      </td>

      <td className={classes.price}>
        <span className={classes.currentPrice}>
          {formatNumber(data.current_price)}
        </span>
      </td>

      <td className={classes.high24}>{formatNumber(data.high_24h)}</td>
      <td className={classes.low24}>{formatNumber(data.low_24h)}</td>

      <td
        className={classes.change}
        data-type={
          data.price_change_percentage_24h > 0 ? 'positive' : 'negative'
        }
      >
        {formatPercent(data.price_change_percentage_24h)}
      </td>

      <td className={classes.marketCap}>{formatNumber(data.market_cap)}</td>
      <td className={classes.volume}>{formatNumber(data.total_volume)}</td>
    </tr>
  );
}
