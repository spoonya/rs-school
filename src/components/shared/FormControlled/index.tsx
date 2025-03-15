import cn from 'classnames';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { CountryAutocomplete } from '@/components/shared';
import { Button, Checkbox, FileInput, FormContainer, FormControl, Select, TextField, Title } from '@/components/ui';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { Country, fetchCountries } from '@/store/countries';
import { addUser } from '@/store/users';
import { zodResolver } from '@hookform/resolvers/zod';

import classes from './form.controlled.module.scss';

interface FormControlledProps {
  className?: string;
}

const createFormSchema = (allowedCountries: Country[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine((value) => value.trim()[0] === value.trim()[0]?.toUpperCase(), 'Name must start with a capital letter'),
      age: z.coerce
        .number({
          invalid_type_error: 'Age must be a number',
        })
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must be at most 120'),
      email: z.string({ required_error: 'Email is required' }).email(),
      password: z.string({ required_error: 'Password is required' }).refine(
        (value) => {
          const errors = [];
          if (!/[0-9]/.test(value)) errors.push('number');
          if (!/[A-Z]/.test(value)) errors.push('uppercase letter');
          if (!/[a-z]/.test(value)) errors.push('lowercase letter');
          if (!/[^A-Za-z0-9]/.test(value)) errors.push('special character');
          return errors.length === 0;
        },
        (value) => {
          const errors = [];
          if (!/[0-9]/.test(value)) errors.push('number');
          if (!/[A-Z]/.test(value)) errors.push('uppercase letter');
          if (!/[a-z]/.test(value)) errors.push('lowercase letter');
          if (!/[^A-Za-z0-9]/.test(value)) errors.push('special character');
          return { message: `Password must contain ${errors.join(', ')}` };
        }
      ),
      confirmPassword: z.string(),
      gender: z.enum(['male', 'female'], { required_error: 'Select gender' }),
      country: z
        .string({ required_error: 'Country is required' })
        .refine((val) => allowedCountries.some((country) => country.name.toLowerCase() === val.trim().toLowerCase()), {
          message: 'Invalid country',
        }),
      agreement: z.boolean().refine((val) => val, 'You must accept terms and conditions'),
      picture: z
        .object({
          base64: z.string(),
          size: z.number(),
          type: z.string(),
        })
        .nullable()
        .refine((value) => value !== null, 'Picture is required')
        .refine(
          (value) => value === null || ['image/png', 'image/jpeg'].includes(value.type),
          'Only PNG/JPEG files are allowed'
        )
        .refine((value) => value === null || value.size <= 1 * 1024 * 1024, 'Max file size is 1MB'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export function FormControlled({ className }: Readonly<FormControlledProps>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state: RootState) => state.countries);
  const schema = React.useMemo(() => createFormSchema(countries), [countries]);

  const {
    control,
    register,
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

  React.useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries]);

  const onSubmit = (data: FormValues) => {
    dispatch(
      addUser({
        ...data,
      })
    );
    navigate('/');
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
