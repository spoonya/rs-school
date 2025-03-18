import cn from 'classnames';

import classes from './title.module.scss';

interface TitleProps {
  className?: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Title({ children, className, level = 1 }: Readonly<TitleProps>) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <HeadingTag className={cn(classes.root, className)}>{children}</HeadingTag>;
}
