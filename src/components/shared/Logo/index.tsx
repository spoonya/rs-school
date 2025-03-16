import cn from 'classnames';
import Link from 'next/link';

import { AppRoutes } from '@/services';

import classes from './logo.module.scss';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: Readonly<LogoProps>) {
  return (
    <Link href={AppRoutes.HOME} className={cn(classes.root, className)} data-testid="logo">
      <span className={classes.nex}>NEX</span>
      <span className={classes.um}>UM</span>
      <span className={classes.dot}>•</span>
    </Link>
  );
}
