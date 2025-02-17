import cn from 'classnames';

import classes from './flyout.module.scss';

export interface FlyoutProps {
  className?: string;
  children: React.ReactNode;
}

export function Flyout({ className, children }: Readonly<FlyoutProps>) {
  return <div className={cn(classes.root, className)}>{children}</div>;
}
