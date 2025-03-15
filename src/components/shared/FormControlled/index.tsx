import cn from 'classnames';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CountryAutocomplete } from '@/components/shared';
import classes from '@/components/shared/forms.module.scss';
import {
  Button,
  Checkbox,
  FileInput,
  FormContainer,
  FormControl,
  PasswordStrength,
  Select,
  TextField,
  Title,
} from '@/components/ui';
import { useAuthFormSubmit, useCountries } from '@/hooks';
import { createFormSchema } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export function FormControlled({ className }: { className?: string }) {
  const countries = useCountries();
  const schema = React.useMemo(() => createFormSchema(countries), [countries]);
  const submitUser = useAuthFormSubmit();

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      password: '',
      confirmPassword: '',
      gender: undefined,
      country: '',
      agreement: false,
      picture: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    submitUser(data);
  };

  return (
    <FormContainer className={cn(classes.root, className)}>
      <Title className={classes.title}>Form Controlled</Title>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl>
          <TextField
            {...register('name')}
            placeholder="Valerij"
            label="Name"
            autoComplete="name"
            error={!!errors.name}
            errorText={errors.name?.message}
          />
        </FormControl>

        <FormControl>
          <TextField
            {...register('age')}
            placeholder="54"
            label="Age"
            type="number"
            error={!!errors.age}
            errorText={errors.age?.message}
          />
        </FormControl>

        <FormControl>
          <TextField
            {...register('email')}
            placeholder="zhmyshenko@gmail.com"
            label="Email"
            type="email"
            autoComplete="email"
            error={!!errors.email}
            errorText={errors.email?.message}
          />
        </FormControl>

        <FormControl>
          <TextField
            {...register('password')}
            label="Password"
            type="password"
            error={!!errors.password}
            errorText={errors.password?.message}
          />
          <PasswordStrength classname={classes.passwordStrength} password={watch('password') || ''} />
        </FormControl>

        <FormControl>
          <TextField
            {...register('confirmPassword')}
            label="Repeat password"
            type="password"
            error={!!errors.confirmPassword}
            errorText={errors.confirmPassword?.message}
          />
        </FormControl>

        <FormControl>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
                placeholder="Select gender"
                error={!!errors.gender}
                errorText={errors.gender?.message}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountryAutocomplete
                {...field}
                id="country"
                label="Select Country"
                error={!!errors.country}
                errorText={errors.country?.message}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <FileInput
                {...field}
                label="Picture"
                accept="image/png, image/jpeg"
                error={!!errors.picture}
                errorText={errors.picture?.message}
                onChange={(value) => field.onChange(value || null)}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                className={classes.checkbox}
                checked={field.value}
                onChange={field.onChange}
                label="I accept terms and conditions"
                error={!!errors.agreement}
                errorText={errors.agreement?.message}
              />
            )}
          />
        </FormControl>

        <Button
          variant="primary"
          type="submit"
          className={classes.submit}
          disabled={!isValid || isSubmitting || !isDirty}
        >
          Submit
        </Button>
      </form>
    </FormContainer>
  );
}
