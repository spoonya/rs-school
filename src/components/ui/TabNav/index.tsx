import cn from 'classnames';

import classes from './tab.nav.module.scss';

interface TabNavProps<T> {
  className?: string;
  activeTab?: T;
  onChange: (value: T) => void;
  navItems: { label: string; value: T }[];
}

export function TabNav<T>({ className, navItems, activeTab, onChange }: Readonly<TabNavProps<T>>) {
  return (
    <ul className={cn(classes.root, className, 'list-reset')}>
      {navItems.map((item) => (
        <li key={item.value as string}>
          <button
            type="button"
            className={cn(classes.navBtn, { [classes.active]: activeTab === item.value })}
            onClick={() => {
              onChange(item.value);
            }}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
