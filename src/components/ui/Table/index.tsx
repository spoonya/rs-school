import cn from 'classnames';

import classes from './table.module.scss';

interface TableProps {
  className?: string;
  children: React.ReactNode;
}

export function Table({ className, children }: Readonly<TableProps>) {
  return <table className={cn(classes.root, className)}>{children}</table>;
}
