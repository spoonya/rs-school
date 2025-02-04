import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import classes from './button.module.scss';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
}

export function Button({ className, ...props }: Readonly<ButtonProps>) {
  return (
    <button className={cn(classes.root, className)} {...props}>
      Button
    </button>
  );
}
