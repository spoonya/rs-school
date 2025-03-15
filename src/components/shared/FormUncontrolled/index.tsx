import cn from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { CountryAutocomplete } from '@/components/shared';
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
import { FileInputHandle } from '@/components/ui/FileInput';
import { AppRoutes } from '@/services';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { Country, fetchCountries } from '@/store/countries';
import { addUser } from '@/store/users';

import classes from './form.uncontrolled.module.scss';

interface FormUncontrolledProps {
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
          return { message: `Must contain ${errors.join(', ')}` };
        }
      ),
      confirmPassword: z.string(),
      gender: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.enum(['male', 'female'], { required_error: 'Select gender' })
      ),
      country: z.preprocess(
        (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
        z
          .string({ required_error: 'Country is required' })
          .refine(
            (val) => allowedCountries.some((country) => country.name.toLowerCase() === val.trim().toLowerCase()),
            { message: 'Invalid country' }
          )
      ),
      agreement: z.boolean().refine((val) => val, 'You must accept terms and conditions'),
      picture: z
        .object({
          base64: z.string(),
          size: z.number(),
          type: z.string(),
        })
        .nullable()
        .superRefine((val, ctx) => {
          if (!val) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Picture is required',
              path: ['picture'],
            });
            return;
          }

          if (!['image/png', 'image/jpeg'].includes(val.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Only PNG/JPEG files are allowed',
              path: ['picture'],
            });
          }

          if (val.size > 1 * 1024 * 1024) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Max file size is 1MB',
              path: ['picture'],
            });
          }
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

export function FormUncontrolled({ className }: Readonly<FormUncontrolledProps>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state: RootState) => state.countries);
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

  React.useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries]);

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
      const newErrors = validationResult.error.errors.reduce(
        (acc, curr) => {
          if (curr.path[0] === 'password') {
            acc.password = acc.password ? `${acc.password}, ${curr.message}` : curr.message;
          } else {
            acc[curr.path[0]] = curr.message;
          }
          return acc;
        },
        {} as Record<string, string>
      );
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(addUser(validationResult.data));
      navigate(AppRoutes.HOME);
    }
  };

  return (
    <FormContainer className={cn(classes.root, className)}>
      <Title className={classes.title}>Form Uncontrolled</Title>
      <form onSubmit={handleSubmit} noValidate>
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
          <TextField
            ref={passwordRef}
            label="Password"
            type="password"
            error={!!errors.password}
            errorText={errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrength classname={classes.passwordStrength} password={password} />
        </FormControl>

        <FormControl>
          <TextField
            ref={confirmPasswordRef}
            label="Repeat password"
            type="password"
            error={!!errors.confirmPassword}
            errorText={errors.confirmPassword}
          />
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
            error={!!errors.gender}
            errorText={errors.gender}
          />
        </FormControl>

        <FormControl>
          <CountryAutocomplete
            ref={countryRef}
            id="country"
            label="Select Country"
            error={!!errors.country}
            errorText={errors.country}
          />
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
