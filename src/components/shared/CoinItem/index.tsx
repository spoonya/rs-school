import cn from 'classnames';

import classes from './coin.item.module.scss';

interface CoinItemProps {
  className?: string;
}

export function CoinItem({ className }: Readonly<CoinItemProps>) {
  return <div className={cn(classes.root, className)}>CoinItem</div>;
}
