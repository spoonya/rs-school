import cn from 'classnames';

import classes from './table.cell.module.scss';

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children?: React.ReactNode;
  align?: 'center' | 'left' | 'right';
}

export function TableCell({ className, children, align, ...props }: Readonly<TableCellProps>) {
  return (
    <td
      className={cn(
        classes.root,
        className,
        { [classes.center]: align === 'center' },
        { [classes.left]: align === 'left' },
        { [classes.right]: align === 'right' }
      )}
      {...props}
    >
      {children}
    </td>
  );
}
