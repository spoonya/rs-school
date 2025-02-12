import cn from 'classnames';

import { Container, Logo } from '@/components/shared';

import classes from './header.module.scss';
import { useTheme } from '@/contexts';
import { Themes } from '@/services';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: Readonly<HeaderProps>) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={cn(classes.root, className)}>
      <Container>
        <div className={classes.top}>
          <Logo className={classes.logo} />
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === Themes.LIGHT ? '🌙' : '☀️'}
          </button>
        </div>
      </Container>
    </header>
  );
}
