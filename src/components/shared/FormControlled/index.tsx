import cn from 'classnames';

import { FormContainer } from '@/components/ui';

import classes from './form.controlled.module.scss';

interface FormControlledProps {
  className?: string;
}

export function FormControlled({ className }: Readonly<FormControlledProps>) {
  return <FormContainer className={cn(classes.root, className)}>Form</FormContainer>;
}
