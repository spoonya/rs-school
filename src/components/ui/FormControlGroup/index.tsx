import cn from 'classnames';

import classes from './form.control.group.module.scss';

interface FormControlGroupProps {
  className?: string;
  children: React.ReactNode;
}

export function FormControlGroup({ className, children }: FormControlGroupProps) {
  return <div className={cn(classes.root, className)}>{children}</div>;
}
