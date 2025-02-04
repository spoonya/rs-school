import cn from 'classnames';

import { Input } from '@/components/ui';

import classes from './search.module.scss';

interface SearchProps {
  className?: string;
}

export function Search({ className }: Readonly<SearchProps>) {
  return (
    <div className={cn(classes.root, className)}>
      <Input />
    </div>
  );
}
