import cn from 'classnames';

import { Logo, MainMenu } from '@/components/shared';
import { Container } from '@/components/ui';

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
          <div className={classes.left}>
            <Logo className={classes.logo} />
            <MainMenu className={classes.menu} />
          </div>
          <ThemeSwitcher />
        </div>
      </Container>
    </header>
  );
}
