import cn from 'classnames';
import { Search as SearchIcon } from 'lucide-react';

import { Button, Input } from '@/components/ui';

import classes from './search.module.scss';

interface SearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function Search({
  className,
  placeholder,
  onSearch,
}: Readonly<SearchProps>) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    onSearch?.(input.value);
  };

  return (
    <form className={cn(classes.root, className)} onSubmit={handleSubmit}>
      <div className={classes.inputWrapper}>
        <SearchIcon className={classes.icon} size={20} />
        <Input
          className={classes.input}
          placeholder={placeholder}
          name="search"
        />
      </div>
      <Button className={classes.button}>Search</Button>
    </form>
  );
}
