import { Checkbox } from '@/components/ui/Checkbox';
import { Star } from 'lucide-react';
import cn from 'classnames';

import classes from './checkbox.favorite.module.scss';

interface FavoriteCheckboxProps {
  className?: string;
  isFavorite: boolean;
  onFavorite: () => void;
}

export function CheckboxFavorite({ className, isFavorite, onFavorite }: Readonly<FavoriteCheckboxProps>) {
  return (
    <Checkbox
      className={cn(className, classes.favoriteCheckbox)}
      checked={isFavorite}
      onChange={onFavorite}
      icon={<Star className={cn(classes.checkedIcon, { [classes.favoriteUnchecked]: !isFavorite })} />}
      checkedIcon={<Star className={classes.favoriteChecked} />}
    />
  );
}
