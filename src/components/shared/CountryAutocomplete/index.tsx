import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { Dropdown, Input } from '@/components/ui';
import { useFetchCountriesQuery } from '@/services/api';

import classes from './country.autocomplete.module.scss';

interface AutocompleteProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const CountryAutocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ id, label, value, onChange, className }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: countries, isFetching: loading } = useFetchCountriesQuery();

    useEffect(() => {
      if (value) {
        const selectedCountry = countries?.find((c) => c.name.common === value);
        setInputValue(selectedCountry?.name.common || '');
      }
    }, [value, countries]);

    const filteredCountries = countries
      ?.filter((country) => country.name.common.toLowerCase().includes(inputValue.toLowerCase()))
      .sort((a, b) => a.name.common.localeCompare(b.name.common));

    const handleSelect = (countryName: string) => {
      setInputValue(countryName);
      onChange?.(countryName);
      setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      onChange?.('');
      if (!isOpen) setIsOpen(true);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className={cn(classes.wrapper, className)} ref={containerRef}>
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>

        <div className={classes.inputWrapper}>
          <Input
            ref={ref}
            id={id}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
          />

          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className={classes.suggestions}>
            {loading ? (
              <div className={classes.loading}>Loading...</div>
            ) : filteredCountries && filteredCountries.length > 0 ? (
              filteredCountries?.map((country) => (
                <div
                  key={country.cca2}
                  onClick={() => handleSelect(country.name.common)}
                  className={classes.suggestionItem}
                >
                  {country.name.common}
                </div>
              ))
            ) : (
              <div className={classes.noResults}>No countries found</div>
            )}
          </Dropdown>
        </div>
      </div>
    );
  }
);

CountryAutocomplete.displayName = 'CountryAutocomplete';
