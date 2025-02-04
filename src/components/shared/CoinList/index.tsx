import cn from 'classnames';

import classes from './coin.list.module.scss';

interface CoinListProps {
  className?: string;
}

export function CoinList({ className }: Readonly<CoinListProps>) {
  return <div className={cn(classes.root, className)}>CoinList</div>;
}
