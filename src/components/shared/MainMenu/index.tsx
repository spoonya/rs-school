import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { navMenu } from '@/services';

import classes from './main.menu.module.scss';

interface Props {
  className?: string;
}

export function MainMenu({ className }: Readonly<Props>) {
  return (
    <nav className={cn(classes.root, className)}>
      <ul className={cn(classes.navList, 'list-reset')}>
        {navMenu.map((item) => (
          <li key={item.title} className={classes.navItem}>
            <NavLink to={item.path} className={({ isActive }) => cn(classes.link, { [classes.active]: isActive })}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
