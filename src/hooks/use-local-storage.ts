import React from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = React.useState(() => {
    try {
      const storageValue = localStorage.getItem(key);
      if (!storageValue) return defaultValue;

      const parsedValue = JSON.parse(storageValue);
      if (typeof parsedValue === 'string' && !parsedValue.trim()) {
        localStorage.removeItem(key);
        return defaultValue;
      }

      return parsedValue;
    } catch {
      return defaultValue;
    }
  });

  const updateValue = React.useCallback(
    (newValue: T) => {
      setValue(newValue);
      if (typeof newValue === 'string' && !newValue.trim()) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [key]
  );

  return [value, updateValue];
}
