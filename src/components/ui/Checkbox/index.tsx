import cn from 'classnames';
import { Check } from 'lucide-react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import classes from './checkbox.module.scss';

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  checked?: boolean;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  className,
  checked,
  onChange,
  icon,
  checkedIcon,
  label,
  disabled,
  ...props
}: Readonly<CheckboxProps>) {
  const hasCustomIcon = Boolean(icon || checkedIcon);

  return (
    <div className={cn(classes.root, className, { [classes.disabled]: disabled })} data-testid="checkbox-wrapper">
      <label className={classes.label} data-testid="checkbox-label">
        <input
          type="checkbox"
          className={cn(classes.input)}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
          data-testid="checkbox-input"
        />
        <span className={cn(classes.icon, { [classes.customIcon]: hasCustomIcon })} data-testid="checkbox-icon">
          {checked ? checkedIcon || icon || <Check data-testid="default-check-icon" /> : icon || ''}
        </span>
        {label && (
          <span className={classes.text} data-testid="checkbox-text">
            {label}
          </span>
        )}
      </label>
    </div>
  );
}
