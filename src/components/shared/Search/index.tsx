import cn from 'classnames';
import { Search as SearchIcon } from 'lucide-react';
import React from 'react';

import { Button, Input } from '@/components/ui';
import { SEARCH_QUERY_KEY } from '@/services/constants';

import classes from './search.module.scss';

interface SearchProps {
  className?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function Search({
  className,
  placeholder,
  onSearch,
}: Readonly<SearchProps>) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    localStorage.setItem(SEARCH_QUERY_KEY, searchQuery);
  };

  React.useEffect(() => {
    const query = localStorage.getItem(SEARCH_QUERY_KEY);
    if (query) {
      setSearchQuery(query);
      onSearch(query);
    }
  }, [onSearch]);

  return (
    <form className={cn(classes.root, className)} onSubmit={handleSubmit}>
      <div className={classes.inputWrapper}>
        <SearchIcon className={classes.icon} size={20} />
        <Input
          className={classes.input}
          placeholder={placeholder}
          name="search"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      <Button className={classes.button}>Search</Button>
    </form>
  );
}
