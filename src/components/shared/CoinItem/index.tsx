'use client';

import cn from 'classnames';
import { useRouter } from 'next/router';

import { CheckboxFavorite } from '@/components/shared';
import { AppRoutes, SearchParams } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store';
import { addFavorite, removeFavorite } from '@/store/favorites/slice';
import { Coin } from '@/types';
import { formatNumber, formatPercent } from '@/utils';

import classes from './coin.item.module.scss';

interface CoinItemProps {
  className?: string;
  data: Coin;
}

export function CoinItem({ data, className }: Readonly<CoinItemProps>) {
  const router = useRouter();
  const { query } = router;

  const favorites = useAppSelector((state) => state.favorites.coins);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const currentPage = query[SearchParams.PAGE];
    const url = {
      pathname: AppRoutes.COIN_DETAILS.replace('[id]', data.id),
      query: currentPage ? { [SearchParams.PAGE]: currentPage } : undefined,
    };

    router.push(url);
  };

  const isFavorite = favorites.some((coin) => coin.id === data.id);

  return (
    <tr
      className={cn(classes.root, className)}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      data-testid="coin-item"
    >
      <td className={classes.center}>
        <div onClick={(e) => e.stopPropagation()}>
          <CheckboxFavorite
            isFavorite={isFavorite}
            onFavorite={() => {
              if (isFavorite) {
                dispatch(removeFavorite(data.id));
              } else {
                dispatch(addFavorite(data));
              }
            }}
          />
        </div>
      </td>
      <td className={classes.center}>{data.rank}</td>
      <td className={classes.mainInfo}>
        <img src={data.icon} alt={data.name} className={classes.logo} />
        <div className={classes.nameBlock}>
          <span className={classes.name}>{data.name}</span>
          <span className={classes.symbol}>{data.symbol}</span>
        </div>
      </td>
      <td className={classes.price}>
        <span className={classes.currentPrice}>{formatNumber(data.price, { isCurrency: true })}</span>
      </td>
      <td className={classes.change} data-type={(data.priceChange1h ?? 0) > 0 ? 'positive' : 'negative'}>
        {formatPercent(data.priceChange1h)}
      </td>
      <td className={classes.change} data-type={(data.priceChange1d ?? 0) > 0 ? 'positive' : 'negative'}>
        {formatPercent(data.priceChange1d)}
      </td>
      <td className={classes.change} data-type={(data.priceChange1w ?? 0) > 0 ? 'positive' : 'negative'}>
        {formatPercent(data.priceChange1w)}
      </td>
      <td className={classes.volume}>{formatNumber(data.volume, { isCurrency: true })}</td>
      <td className={classes.marketCap}>{formatNumber(data.marketCap, { isCurrency: true })}</td>
    </tr>
  );
}
