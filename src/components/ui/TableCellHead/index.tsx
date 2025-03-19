import cn from 'classnames';

import classes from './table.cell.head.module.scss';

interface TableCellHeadProps {
  className?: string;
  children?: React.ReactNode;
  align?: 'center' | 'left' | 'right';
}

export function TableCellHead({ className, children, align }: Readonly<TableCellHeadProps>) {
  return (
    <th
      className={cn(
        classes.root,
        className,
        { [classes.center]: align === 'center' },
        { [classes.left]: align === 'left' },
        { [classes.right]: align === 'right' }
      )}
    >
      {children}
    </th>
  );
}
