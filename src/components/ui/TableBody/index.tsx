import cn from 'classnames';

import classes from './table.body.module.scss';

interface TableBodyProps {
  className?: string;
  children?: React.ReactNode;
}

export function TableBody({ className, children }: Readonly<TableBodyProps>) {
  return <tbody className={cn(classes.root, className)}>{children}</tbody>;
}
