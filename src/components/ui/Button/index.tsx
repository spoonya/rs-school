import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import classes from './button.module.scss';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  children: ReactNode;
}

export function Button({
  className,
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button className={cn(classes.root, className)} {...props}>
      {children}
    </button>
  );
}
