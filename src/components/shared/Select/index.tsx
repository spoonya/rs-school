import cn from 'classnames';
import { ChevronDown } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';

import { Dropdown } from '../../ui/Dropdown';
import classes from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

export function Select({
  className,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  label,
  ...props
}: Readonly<SelectProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
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

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className={cn(classes.root, className)} {...props}>
      {label && <span className={classes.label}>{label}</span>}
      <div
        className={cn(classes.selectContainer, {
          [classes.open]: isOpen,
          [classes.disabled]: disabled,
        })}
        ref={containerRef}
      >
        <div className={classes.selected} onClick={handleToggle} role="button" tabIndex={0}>
          <span className={classes.value}>
            {selectedLabel || <span className={classes.placeholder}>{placeholder}</span>}
          </span>
          <ChevronDown className={classes.arrow} />
        </div>

        <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {options.map((option) => (
            <div
              key={option.value}
              className={classes.option}
              onClick={() => handleSelect(option.value)}
              role="option"
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}
