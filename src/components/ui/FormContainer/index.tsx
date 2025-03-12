import cn from 'classnames';

import classes from './form.container.module.scss';

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FormContainer({ children, className }: Readonly<FormContainerProps>) {
  return <div className={cn(classes.root, className)}>{children}</div>;
}
