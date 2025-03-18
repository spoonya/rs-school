import cn from 'classnames';

import classes from './table.row.module.scss';

interface TableRowProps {
  className?: string;
  children: React.ReactNode;
}

export function TableRow({ className, children }: Readonly<TableRowProps>) {
  return <tr className={cn(classes.root, className)}>{children}</tr>;
}
