import cn from 'classnames';
import { Maximize2, Minimize2 } from 'lucide-react';
import React from 'react';

import classes from './flyout.module.scss';

export interface FlyoutProps {
  children: React.ReactNode;
  isOpen: boolean;
  position?: 'bottom-left' | 'bottom-right';
  className?: string;
  minimizeBtn?: boolean;
  contentOnMinimize?: React.ReactNode;
  onMinimize?: () => void;
}

export function Flyout({
  className,
  children,
  isOpen,
  position = 'bottom-left',
  minimizeBtn,
  onMinimize,
  contentOnMinimize,
}: Readonly<FlyoutProps>) {
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsHovering(false);
    onMinimize?.();
  };

  return (
    <div
      className={cn(
        classes.root,
        className,
        { [classes['is-open']]: isOpen },
        { [classes['is-closed']]: !isOpen },
        { [classes[`${position}`]]: position },
        { [classes['is-minimized']]: isMinimized }
      )}
    >
      {minimizeBtn && (
        <button
          className={classes.minimizeBtn}
          onClick={handleMinimize}
          aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {!isMinimized && <Minimize2 size={20} />}
          {isMinimized && isHovering && <Maximize2 size={20} />}
        </button>
      )}
      <div className={classes.content}>
        {isMinimized && !isHovering && <div className={classes.contentOnMinimize}>{contentOnMinimize}</div>}
        {!isMinimized && children}
      </div>
    </div>
  );
}
