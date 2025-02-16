import cn from 'classnames';

import { Container, Logo, ThemeSwitcher } from '@/components/shared';

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
