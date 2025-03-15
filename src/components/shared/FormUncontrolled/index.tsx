import cn from 'classnames';
import React from 'react';

import { CountryAutocomplete } from '@/components/shared';
import classes from '@/components/shared/forms.module.scss';
import {
  Button,
  Checkbox,
  FileInput,
  FormContainer,
  FormControl,
  FormControlGroup,
  PasswordStrength,
  Select,
  TextField,
  Title,
} from '@/components/ui';
import { FileInputHandle } from '@/components/ui/FileInput';
import { useAuthFormSubmit, useCountries } from '@/hooks';
import { createFormSchema, formatZodErrors } from '@/utils';

interface FormUncontrolledProps {
  className?: string;
}

export function FormUncontrolled({ className }: FormUncontrolledProps) {
  const countries = useCountries();
  const submitUser = useAuthFormSubmit();

  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState<string>('');
  const pictureRef = React.useRef<FileInputHandle>(null);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
  const countryRef = React.useRef<HTMLInputElement>(null);
  const agreementRef = React.useRef<HTMLInputElement>(null);

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value ? Number(ageRef.current.value) : undefined,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender,
      country: countryRef.current?.value || '',
      agreement: agreementRef.current?.checked,
      picture: pictureRef.current?.getValue(),
    };

    const schema = createFormSchema(countries);
    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(formatZodErrors(validationResult.error.errors));
    } else {
      setErrors({});
      submitUser(validationResult.data);
    }
  };

  return (
    <FormContainer className={cn(classes.root, className)}>
      <Title className={classes.title}>Form Uncontrolled</Title>
      <form onSubmit={handleSubmit} noValidate>
        <FormControl>
          <FormControlGroup>
            <TextField
              ref={nameRef}
              placeholder="Valerij"
              label="Name"
              autoComplete="name"
              error={!!errors.name}
              errorText={errors.name}
            />
            <TextField
              ref={ageRef}
              placeholder="54"
              label="Age"
              type="number"
              error={!!errors.age}
              errorText={errors.age}
            />
          </FormControlGroup>
        </FormControl>

        <FormControl>
          <TextField
            ref={emailRef}
            placeholder="zhmyshenko@gmail.com"
            label="Email"
            type="email"
            autoComplete="email"
            error={!!errors.email}
            errorText={errors.email}
          />
        </FormControl>

        <FormControl>
          <FormControlGroup>
            <TextField
              ref={passwordRef}
              label="Password"
              type="password"
              error={!!errors.password}
              errorText={errors.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              ref={confirmPasswordRef}
              label="Repeat password"
              type="password"
              error={!!errors.confirmPassword}
              errorText={errors.confirmPassword}
            />
            <PasswordStrength classname={classes.passwordStrength} password={password} />
          </FormControlGroup>
        </FormControl>

        <FormControl>
          <FormControlGroup>
            <Select
              label="Gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              value={gender}
              onChange={setGender}
              placeholder="Select gender"
              error={!!errors.gender}
              errorText={errors.gender}
            />
            <CountryAutocomplete
              ref={countryRef}
              id="country"
              label="Select Country"
              error={!!errors.country}
              errorText={errors.country}
            />
          </FormControlGroup>
        </FormControl>

        <FormControl>
          <FileInput
            ref={pictureRef}
            label="Picture"
            accept="image/png, image/jpeg"
            error={!!errors.picture}
            errorText={errors.picture}
          />
        </FormControl>

        <FormControl>
          <Checkbox
            ref={agreementRef}
            className={classes.checkbox}
            label="I accept terms and conditions"
            error={!!errors.agreement}
            errorText={errors.agreement}
          />
        </FormControl>

        <Button variant="primary" type="submit" className={classes.submit}>
          Submit
        </Button>
      </form>
    </FormContainer>
  );
}
