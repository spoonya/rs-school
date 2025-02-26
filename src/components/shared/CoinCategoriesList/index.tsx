import cn from 'classnames';

import { TabNav } from '@/components/ui';
import { CoinCategories, coinCategories } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store';
import { setActiveCategory } from '@/store/coin-categories/slice';

import classes from './coin.categories.module.scss';

interface CoinCategoriesListProps {
  className?: string;
}

export function CoinCategoriesList({ className }: Readonly<CoinCategoriesListProps>) {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.coinCategories.activeCategory);

  const handleChange = (category: CoinCategories) => {
    dispatch(setActiveCategory(category));
  };

  return (
    <div className={cn(classes.root, className)}>
      <TabNav<CoinCategories> navItems={coinCategories} onChange={handleChange} activeTab={activeCategory} />
    </div>
  );
}
