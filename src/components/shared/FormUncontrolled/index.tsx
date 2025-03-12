import cn from 'classnames';

import { Button, Checkbox, FormContainer, FormControl, Title } from '@/components/ui';

import { TextField } from '../TextField';
import classes from './form.uncontrolled.module.scss';

interface FormUncontrolledProps {
  className?: string;
}

export function FormUncontrolled({ className }: Readonly<FormUncontrolledProps>) {
  return (
    <FormContainer className={cn(classes.root, className)}>
      <Title className={classes.title}>Form Uncontrolled</Title>
      <form className={classes.form}>
        <FormControl>
          <TextField placeholder="Valerij" label="Name" />
        </FormControl>
        <FormControl>
          <TextField placeholder="54" label="Age" type="number" />
        </FormControl>
        <FormControl>
          <TextField placeholder="zhmyshenko@gmail.com" label="Email" type="email" />
        </FormControl>
        <FormControl>
          <TextField label="Password" type="password" />
        </FormControl>
        <FormControl>
          <TextField label="Repeat password" type="password" />
        </FormControl>
        <FormControl>
          <Checkbox className={classes.checkbox} label="I accept terms and conditions" />
        </FormControl>
      </form>
      <Button variant="primary" type="submit" className={classes.submit}>
        Submit
      </Button>
    </FormContainer>
  );
}
