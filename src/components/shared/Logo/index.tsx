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
      <span className={classes.part1}>PERFOR</span>
      <span className={classes.part2}>MANCE</span>
      <span className={classes.dot}>•</span>
    </Link>
  );
}
