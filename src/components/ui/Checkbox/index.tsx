import cn from 'classnames';
import { Check } from 'lucide-react';
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useState } from 'react';

import { FormControlError } from '../FormControlError';
import classes from './checkbox.module.scss';

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  checked?: boolean;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  label?: string;
  error?: boolean;
  errorText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef(
  (
    {
      className,
      checked,
      onChange,
      icon,
      checkedIcon,
      label,
      disabled,
      defaultChecked,
      error,
      errorText,
      ...props
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
    const hasCustomIcon = Boolean(icon || checkedIcon);
    const isControlled = checked !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <div className={cn(classes.root, className, { [classes.disabled]: disabled })}>
        <label className={classes.label}>
          <input
            ref={ref}
            type="checkbox"
            className={cn(classes.input)}
            checked={isControlled ? checked : internalChecked}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
          <span className={cn(classes.icon, { [classes.customIcon]: hasCustomIcon })}>
            {isControlled
              ? checked
                ? checkedIcon || icon || <Check className={classes.defaultIcon} />
                : icon || ''
              : internalChecked
                ? checkedIcon || icon || <Check className={classes.defaultIcon} />
                : icon || ''}
          </span>
          {label && <span className={classes.text}>{label}</span>}
        </label>
        {error && <FormControlError className={classes.error}>{errorText}</FormControlError>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
