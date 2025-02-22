export interface CSVField<T, K extends keyof T = keyof T> {
  key: K;
  label?: string;
  formatter?: (value: T[K], record?: T) => string;
}

export interface CSVOptions<T> {
  fields: CSVField<T>[];
  delimiter?: string;
  includeBOM?: boolean;
}
