import cn from 'classnames';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import classes from './input.module.scss';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn(classes.root, className)} {...props} />;
});

Input.displayName = 'Input';
