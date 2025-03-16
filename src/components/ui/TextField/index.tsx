import cn from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useState } from 'react';

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
  ({ className, label, placeholder, error, errorText, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = type === 'password';

    return (
      <div className={cn(classes.root, className)}>
        <label className={classes.wrapper}>
          {label && <span className={classes.label}>{label}</span>}
          <div className={classes.inputContainer}>
            <Input
              ref={ref}
              className={cn(classes.input, {
                [classes.errorInput]: error,
                [classes.inputWithToggle]: isPasswordField,
              })}
              placeholder={placeholder}
              type={isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type}
              {...props}
            />
            {isPasswordField && (
              <span
                role="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className={cn(classes.toggleButton)}
                aria-label={isPasswordVisible ? 'Show password' : 'Hide password'}
              >
                {isPasswordVisible ? (
                  <EyeOff size={20} className={classes.icon} />
                ) : (
                  <Eye size={20} className={classes.icon} />
                )}
              </span>
            )}
          </div>
          {error && <FormControlError className={classes.error}>{errorText}</FormControlError>}
        </label>
      </div>
    );
  }
);

TextField.displayName = 'TextField';
