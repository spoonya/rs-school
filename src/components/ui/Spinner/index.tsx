import cn from 'classnames';

import classes from './spinner.module.scss';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: Readonly<SpinnerProps>) {
  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.spinner}></div>
    </div>
  );
}
