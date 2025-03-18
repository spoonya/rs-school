import cn from 'classnames';

import classes from './table.head.module.scss';

interface TableHeadProps {
  className?: string;
  children: React.ReactNode;
}

export function TableHead({ className, children }: Readonly<TableHeadProps>) {
  return <thead className={cn(classes.root, className)}>{children}</thead>;
}
