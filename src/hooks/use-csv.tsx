import React from 'react';

import { CSVOptions } from '@/types';
import { generateCSV } from '@/utils';

export const useCSV = () => {
  const linkRef = React.useRef<HTMLAnchorElement | null>(null);

  const downloadCSV = React.useCallback(<T,>(data: T[], options: CSVOptions<T>, filename: string = 'data.csv') => {
    const csvContent = generateCSV(data, options);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = filename;
      linkRef.current.click();
    }

    URL.revokeObjectURL(url);
  }, []);

  const CSVLink = () => (
    <a ref={linkRef} style={{ display: 'none' }} aria-hidden="true" rel="noopener noreferrer" data-testid="csv-link" />
  );

  return { generateCSV, downloadCSV, CSVLink };
};
