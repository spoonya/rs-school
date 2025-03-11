import cn from 'classnames';

import { Container, Logo } from '@/components/shared';

import { ThemeSwitcher } from '../ThemeSwitcher';
import classes from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: Readonly<HeaderProps>) {
  return (
    <header className={cn(classes.root, className)}>
      <Container>
        <div className={classes.top}>
          <Logo className={classes.logo} />
          <ThemeSwitcher />
        </div>
      </Container>
    </header>
  );
}
