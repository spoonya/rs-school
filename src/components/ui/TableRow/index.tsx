import cn from 'classnames';

import classes from './table.row.module.scss';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  children: React.ReactNode;
}

export function TableRow({ className, children, ...props }: Readonly<TableRowProps>) {
  return (
    <tr className={cn(classes.root, className)} {...props}>
      {children}
    </tr>
  );
}
