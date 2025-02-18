import React from 'react';

import { CSVOptions } from '@/types';
import { generateCSV } from '@/utils';

export const useCSV = () => {
  const downloadCSV = React.useCallback(<T>(data: T[], options: CSVOptions<T>, filename: string = 'data.csv') => {
    const csvContent = generateCSV(data, options);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return { generateCSV, downloadCSV };
};
