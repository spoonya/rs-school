import cn from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Input } from '@/components/ui';

import classes from './text.field.module.scss';

interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  placeholder?: string;
  label?: string;
}

export function TextField({ className, label, placeholder, ...props }: Readonly<TextFieldProps>) {
  return (
    <div className={cn(classes.root, className)}>
      <label className={classes.wrapper}>
        {label && <span className={classes.label}>{label}</span>}
        <Input className={classes.input} placeholder={placeholder} {...props} />
      </label>
    </div>
  );
}
