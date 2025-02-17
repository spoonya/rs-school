import cn from 'classnames';
import React from 'react';

import classes from './flyout.module.scss';

export interface FlyoutProps {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
}

export function Flyout({ className, children, isOpen }: Readonly<FlyoutProps>) {
  return (
    <div className={cn(classes.root, className, { [classes['is-open']]: isOpen }, { [classes['is-closed']]: !isOpen })}>
      {children}
    </div>
  );
}
