import cn from 'classnames';
import React from 'react';

import { Button, Checkbox, FormContainer, FormControl, Title } from '@/components/ui';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { fetchCountries } from '@/store/countries';

import { CountryAutocomplete } from '../CountryAutocomplete';
import { FileInput } from '../FileInput';
import { Select } from '../Select';
import { TextField } from '../TextField';
import classes from './form.uncontrolled.module.scss';

interface FormUncontrolledProps {
  className?: string;
}

export function FormUncontrolled({ className }: Readonly<FormUncontrolledProps>) {
  const [gender, setGender] = React.useState<string>('');
  const [, setPicture] = React.useState<File | null>(null);

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state: RootState) => state.countries);
  const [selectedCountry, setSelectedCountry] = React.useState('');

  React.useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries]);

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
          <Select
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            value={gender}
            onChange={setGender}
            placeholder="Select gender"
          />
        </FormControl>
        <FormControl>
          <CountryAutocomplete
            id="country"
            label="Select Country"
            value={selectedCountry}
            onChange={setSelectedCountry}
          />
        </FormControl>
        <FormControl>
          <FileInput label="Picture" onChange={setPicture} maxSizeMB={10} accept="image/png, image/jpeg" />
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
