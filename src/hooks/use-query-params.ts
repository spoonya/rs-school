'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { QueryParams } from '@/services';

type QueryParamValue = string | number;

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getParam = useCallback(
    (key: QueryParams, defaultValue: QueryParamValue): QueryParamValue => {
      const value = searchParams.get(key);

      if (value === null) return defaultValue;

      if (typeof defaultValue === 'number') {
        const numValue = parseInt(value, 10);
        return isNaN(numValue) ? defaultValue : numValue;
      }

      return value || defaultValue;
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key: QueryParams, value: QueryParamValue) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === '' || value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, pathname]
  );

  const clearParams = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const setMultipleParams = useCallback(
    (params: Partial<Record<QueryParams, QueryParamValue>>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [router, searchParams, pathname]
  );

  return {
    getParam,
    setParam,
    clearParams,
    setMultipleParams,
    query: Object.fromEntries(searchParams),
  };
};
