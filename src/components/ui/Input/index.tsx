import cn from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import classes from './input.module.scss';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: Readonly<InputProps>) {
  return <input className={cn(classes.root, className)} {...props} />;
}
