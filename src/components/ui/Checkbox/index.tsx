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
  ...props
}: Readonly<CheckboxProps>) {
  const hasCustomIcon = Boolean(icon || checkedIcon);

  return (
    <div className={cn(classes.root, className)}>
      <label className={classes.label}>
        <input type="checkbox" className={cn(classes.input)} checked={checked} onChange={onChange} {...props} />
        <span className={cn(classes.icon, { [classes.customIcon]: hasCustomIcon })}>
          {checked ? checkedIcon || icon || <Check /> : icon || ''}
        </span>
        {label && <span className={classes.text}>{label}</span>}
      </label>
    </div>
  );
}
