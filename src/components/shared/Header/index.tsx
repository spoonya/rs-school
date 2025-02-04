import cn from 'classnames';

import { Container, Search } from '@/components/shared';

import classes from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: Readonly<HeaderProps>) {
  return (
    <header className={cn(classes.root, className)}>
      <Container>
        <Search />
      </Container>
    </header>
  );
}
