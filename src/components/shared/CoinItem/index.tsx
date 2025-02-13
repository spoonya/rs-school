import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes, SearchParams } from '@/services';
import { Coin } from '@/types';
import { formatNumber, formatPercent } from '@/utils';

import classes from './coin.item.module.scss';
import { FavoriteCheckbox } from '@/components/FavoriteCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addFavorite, removeFavorite } from '@/store/favorite/slice';

interface CoinItemProps {
  className?: string;
  data: Coin;
}

export function CoinItem({ data, className }: Readonly<CoinItemProps>) {
  const navigate = useNavigate();
  const location = useLocation();

  const favorites = useSelector((state: RootState) => state.favorite.coinsIds);
  const dispatch = useDispatch();

  const handleClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('page');

    let url = `${AppRoutes.HOME}${AppRoutes.COIN_DETAILS.replace(':id', data.id)}`;
    if (currentPage) {
      url += `?${SearchParams.PAGE}=${currentPage}`;
    }

    navigate(url);
  };

  return (
    <tr
      className={cn(classes.root, className)}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      data-testid="coin-item"
    >
      <td className={classes.center}>
        <FavoriteCheckbox
          isFavorite={favorites.includes(data.id)}
          onFavorite={() => {
            if (favorites.includes(data.id)) {
              dispatch(removeFavorite(data.id));
            } else {
              dispatch(addFavorite(data.id));
            }
          }}
        />
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
