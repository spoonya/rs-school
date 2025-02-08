import cn from 'classnames';
import { Search as SearchIcon } from 'lucide-react';
import React from 'react';

import { Button, Input } from '@/components/ui';
import { useLocalStorage } from '@/hooks';
import { SEARCH_QUERY_KEY } from '@/services/constants';

import classes from './search.module.scss';

interface SearchProps {
  className?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function Search({ className, placeholder, onSearch }: Readonly<SearchProps>) {
  const [searchQuery, setSearchQuery] = useLocalStorage(SEARCH_QUERY_KEY, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      onSearch('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  React.useEffect(() => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  }, []);

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
