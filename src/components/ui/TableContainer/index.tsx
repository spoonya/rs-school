import cn from 'classnames';

import classes from './table.container.module.scss';

interface TableContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function TableContainer({ className, children }: Readonly<TableContainerProps>) {
  return <div className={cn(classes.root, className)}>{children}</div>;
}
