import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import classes from './button.module.scss';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ className, children, variant, ...props }: Readonly<ButtonProps>) {
  return (
    <button
      className={cn(classes.root, className, {
        [classes.primary]: variant === 'primary',
        [classes.secondary]: variant === 'secondary',
      })}
      {...props}
    >
      {children}
    </button>
  );
}
