import cn from 'classnames';

import classes from './container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Readonly<ContainerProps>) {
  return <div className={cn(classes.root, className)}>{children}</div>;
}
