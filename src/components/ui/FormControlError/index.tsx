import cn from 'classnames';

import classes from './form.control.error.module.scss';

interface FormControlErrorProps {
  className?: string;
  children: React.ReactNode;
}

export function FormControlError({ className, children }: FormControlErrorProps) {
  return <div className={cn(classes.root, className)}>{children}</div>;
}
