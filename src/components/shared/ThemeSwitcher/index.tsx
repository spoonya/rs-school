import cn from 'classnames';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts';
import { Themes } from '@/services';

import classes from './theme.switcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: Readonly<ThemeSwitcherProps>) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={cn(classes.root, className)} type="button" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === Themes.LIGHT ? <Sun data-testid="sun-icon" /> : <Moon data-testid="moon-icon" />}
    </button>
  );
}
