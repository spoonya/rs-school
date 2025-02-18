import cn from 'classnames';

import { Button, Flyout } from '@/components/ui';
import { useCSV } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store';
import { removeAllFavorites } from '@/store/favorite/slice';
import { coinCSVOptions } from '@/utils';

import classes from './flyout.favorites.module.scss';

export interface FlyoutFavoritesProps {
  className?: string;
}

export function FlyoutFavorites({ className }: Readonly<FlyoutFavoritesProps>) {
  const { coins } = useAppSelector((state) => state.favorite);
  const { downloadCSV } = useCSV();
  const dispatch = useAppDispatch();

  const isFavoritesEmpty = coins.length === 0;

  return (
    <div className={cn(classes.root, className, { [classes.empty]: isFavoritesEmpty })}>
      <Flyout isOpen={!isFavoritesEmpty}>
        <div className={classes.selected}>Selected coins: {coins.length}</div>
        <div className={classes.buttons}>
          <Button onClick={() => dispatch(removeAllFavorites())}>Unselect all</Button>
          <Button variant="primary" onClick={() => downloadCSV(coins, coinCSVOptions, `${coins.length}_coins.csv`)}>
            Download
          </Button>
        </div>
      </Flyout>
    </div>
  );
}
