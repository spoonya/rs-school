import cn from 'classnames';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { FormControlError, Input } from '@/components/ui';

import classes from './text.field.module.scss';

interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorText?: string | null;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, placeholder, error, errorText, ...props }, ref) => {
    return (
      <div className={cn(classes.root, className)}>
        <label className={classes.wrapper}>
          {label && <span className={classes.label}>{label}</span>}
          <Input
            ref={ref}
            className={cn(classes.input, { [classes.errorInput]: error })}
            placeholder={placeholder}
            {...props}
          />
          {error && <FormControlError className={classes.error}>{errorText}</FormControlError>}
        </label>
      </div>
    );
  }
);

TextField.displayName = 'TextField';
