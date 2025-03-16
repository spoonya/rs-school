import { CSVOptions } from '@/types';

const escapeCSV = (value: string | number): string => {
  const str = value.toString();

  return `"${str.replace(/"/g, '""')}"`;
};

export const generateCSV = <T>(data: T[], options: CSVOptions<T>): string => {
  const { fields, delimiter = ';', includeBOM = true } = options;

  const headers = fields.map((field) => field.label ?? String(field.key));
  const csvRows: string[] = [headers.map(escapeCSV).join(delimiter)];

  data.forEach((record) => {
    const row = fields.map((field) => {
      const rawValue = record[field.key];
      const value = field.formatter ? field.formatter(rawValue, record) : rawValue;

      return escapeCSV(typeof value === 'string' || typeof value === 'number' ? value : String(value));
    });
    csvRows.push(row.join(delimiter));
  });

  const csvString = csvRows.join('\n');

  return includeBOM ? '\uFEFF' + csvString : csvString;
};
