import cn from 'classnames';

import classes from './form.control.module.scss';

interface FormControlProps {
  className?: string;
  children: React.ReactNode;
}

export function FormControl({ className, children }: FormControlProps) {
  return <div className={cn(classes.root, className)}>{children}</div>;
}
