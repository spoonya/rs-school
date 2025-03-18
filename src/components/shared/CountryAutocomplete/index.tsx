import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dropdown, Input } from '@/components/ui';
import { RootState } from '@/store';

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

    const { countries, loading } = useSelector((state: RootState) => state.countries);

    useEffect(() => {
      if (value) {
        const selectedCountry = countries.find((c) => c.name === value);
        setInputValue(selectedCountry?.name || '');
      }
    }, [value, countries]);

    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(inputValue.toLowerCase())
    );

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
            ) : filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div key={country.code} onClick={() => handleSelect(country.name)} className={classes.suggestionItem}>
                  {country.name}
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
