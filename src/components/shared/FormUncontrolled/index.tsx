import cn from 'classnames';
import React from 'react';
import { z } from 'zod';

import { CountryAutocomplete } from '@/components/shared';
import { Button, Checkbox, FileInput, FormContainer, FormControl, Select, TextField, Title } from '@/components/ui';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { fetchCountries } from '@/store/countries';

import classes from './form.uncontrolled.module.scss';

interface FormUncontrolledProps {
  className?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .refine((value) => value.trim()[0] === value.trim()[0]?.toUpperCase(), 'Name must start with a capital letter'),
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be at most 150'),
});

export function FormUncontrolled({ className }: Readonly<FormUncontrolledProps>) {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state: RootState) => state.countries);
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [gender, setGender] = React.useState<string>('');
  const [, setPicture] = React.useState<File | null>(null);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameRef.current || !ageRef.current) return;

    const formData = {
      name: nameRef.current.value,
      age: Number(ageRef.current.value),
    };

    const validationResult = formSchema.safeParse(formData);

    if (!validationResult.success) {
      const newErrors = validationResult.error.errors.reduce(
        (acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        },
        {} as Record<string, string>
      );
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Valid data:', validationResult.data);
    }
  };

  return (
    <FormContainer className={cn(classes.root, className)}>
      <Title className={classes.title}>Form Uncontrolled</Title>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            ref={nameRef}
            placeholder="Valerij"
            label="Name"
            autoComplete="name"
            error={!!errors.name}
            errorText={errors.name}
          />
        </FormControl>

        <FormControl>
          <TextField
            ref={ageRef}
            placeholder="54"
            label="Age"
            type="number"
            error={!!errors.age}
            errorText={errors.age}
          />
        </FormControl>

        <FormControl>
          <TextField placeholder="zhmyshenko@gmail.com" label="Email" type="email" autoComplete="email" />
        </FormControl>

        <FormControl>
          <TextField label="Password" type="password" autoComplete="new-password" />
        </FormControl>

        <FormControl>
          <TextField label="Repeat password" type="password" autoComplete="new-password" />
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

        <Button variant="primary" type="submit" className={classes.submit}>
          Submit
        </Button>
      </form>
    </FormContainer>
  );
}
