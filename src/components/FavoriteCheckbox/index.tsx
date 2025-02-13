import { Checkbox } from '@/components/ui/Checkbox';
import { Heart } from 'lucide-react';
import cn from 'classnames';

import classes from './favorite.checkbox.module.scss';

interface FavoriteCheckboxProps {
  className?: string;
  isFavorite: boolean;
  onFavorite: () => void;
}

export function FavoriteCheckbox({ className, isFavorite, onFavorite }: Readonly<FavoriteCheckboxProps>) {
  return (
    <Checkbox
      className={cn(className, classes.favoriteCheckbox)}
      checked={isFavorite}
      onChange={onFavorite}
      icon={<Heart className={cn(classes.checkedIcon, { [classes.favoriteUnchecked]: !isFavorite })} />}
      checkedIcon={<Heart className={classes.favoriteChecked} />}
    />
  );
}
