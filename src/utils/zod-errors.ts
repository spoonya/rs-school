import { ZodIssue } from 'zod';

export function formatZodErrors(errors: ZodIssue[]): Record<string, string> {
  return errors.reduce(
    (acc, curr) => {
      const key = curr.path[0];
      if (key === 'password') {
        acc.password = acc.password ? `${acc.password}, ${curr.message}` : curr.message;
      } else {
        acc[key] = curr.message;
      }
      return acc;
    },
    {} as Record<string, string>
  );
}
