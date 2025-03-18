import cn from 'classnames';

import classes from './table.cell.module.scss';

interface TableCellProps {
  className?: string;
  children?: React.ReactNode;
}

export function TableCell({ className, children }: Readonly<TableCellProps>) {
  return <td className={cn(classes.root, className)}>{children}</td>;
}
