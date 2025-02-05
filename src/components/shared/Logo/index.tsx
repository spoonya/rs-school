import cn from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@/services';

import classes from './logo.module.scss';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: Readonly<LogoProps>) {
  return (
    <Link to={AppRoutes.HOME} className={cn(classes.root, className)}>
      <span className={classes.nex}>NEX</span>
      <span className={classes.um}>UM</span>
      <span className={classes.dot}>•</span>
    </Link>
  );
}
