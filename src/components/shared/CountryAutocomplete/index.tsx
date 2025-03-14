import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dropdown, FormControlError, Input } from '@/components/ui';
import { RootState } from '@/store';

import classes from './country.autocomplete.module.scss';

interface AutocompleteProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: boolean;
  errorText?: string;
}

export function CountryAutocomplete({ id, label, value, onChange, className, error, errorText }: AutocompleteProps) {
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
    onChange(countryName);
    setInputValue(countryName);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange('');
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className={cn(classes.wrapper, className)} ref={containerRef}>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>

      <div className={classes.inputWrapper}>
        <Input
          className={cn({ [classes.errorInput]: error })}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />

        {error && <FormControlError className={classes.error}>{errorText}</FormControlError>}

        <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className={classes.suggestions}>
          {loading ? (
            <div className={classes.loading}>Loading...</div>
          ) : filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country.code}
                onClick={() => handleSelect(country.name)}
                className={classes.suggestionItem}
                role="option"
                aria-selected={value === country.name}
              >
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
