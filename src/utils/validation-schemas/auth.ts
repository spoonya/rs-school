import { z } from 'zod';

import { Country } from '@/types';

export const createFormSchema = (allowedCountries: Country[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine((value) => value.trim()[0] === value.trim()[0]?.toUpperCase(), 'Name must start with a capital letter'),
      age: z.coerce
        .number({ invalid_type_error: 'Age must be a number' })
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
      confirmPassword: z.string({ required_error: 'Repeat password is required' }),
      gender: z.preprocess(
        (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
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
            });
            return;
          }

          if (!['image/png', 'image/jpeg'].includes(val.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Only PNG/JPEG files are allowed',
            });
          }

          if (val.size > 1 * 1024 * 1024) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Max file size is 1MB',
            });
          }
        }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match",
          path: ['confirmPassword'],
        });
      }
    });
