import cn from 'classnames';

import { Button, Flyout } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store';
import { removeAllFavorites } from '@/store/favorite/slice';

import classes from './flyout.favorites.module.scss';

export interface FlyoutFavoritesProps {
  className?: string;
}

export function FlyoutFavorites({ className }: Readonly<FlyoutFavoritesProps>) {
  const { coinsIds } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const isFavoritesEmpty = coinsIds.length === 0;

  const handleDownload = () => {
    console.log('download');
  };

  return (
    <div className={cn(classes.root, className)}>
      <Flyout isOpen={!isFavoritesEmpty}>
        <div className={classes.selected}>Selected coins: {coinsIds.length}</div>
        <div className={classes.buttons}>
          <Button onClick={() => dispatch(removeAllFavorites())}>Unselect all</Button>
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
        </div>
      </Flyout>
    </div>
  );
}
