import cn from 'classnames';
import { SearchX } from 'lucide-react';

import classes from './no.results.module.scss';

interface NoResultsProps {
  className?: string;
  text: string;
}

export function NoResults({ className, text }: Readonly<NoResultsProps>) {
  return (
    <div className={cn(className, classes.noResults)}>
      <SearchX size={32} className={classes.noResultsIcon} data-testid="search-x" />
      <span>{text}</span>
    </div>
  );
}
