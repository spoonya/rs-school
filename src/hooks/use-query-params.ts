import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { QueryParams } from '@/services';

type QueryParamValue = string | number;

export const useQueryParams = () => {
  const router = useRouter();

  const getParam = useCallback(
    (key: QueryParams, defaultValue: QueryParamValue): QueryParamValue => {
      const value = router.query[key];

      if (value === undefined) return defaultValue;

      const strValue = Array.isArray(value) ? value[0] : value;

      if (typeof defaultValue === 'number') {
        const numValue = parseInt(strValue, 10);
        return isNaN(numValue) ? defaultValue : numValue;
      }

      return strValue || defaultValue;
    },
    [router.query]
  );

  const setParam = useCallback(
    (key: QueryParams, value: QueryParamValue) => {
      const newQuery = { ...router.query };

      if (value === '' || value === null || value === undefined) {
        newQuery[key] = undefined;
      } else {
        newQuery[key] = value.toString();
      }

      router.replace({ query: newQuery }, undefined, { shallow: true });
    },
    [router]
  );

  const clearParams = useCallback(() => {
    router.replace({ query: {} }, undefined, { shallow: true });
  }, [router]);

  const setMultipleParams = useCallback(
    (params: Partial<Record<QueryParams, QueryParamValue>>) => {
      const newQuery = { ...router.query };

      Object.entries(params).forEach(([key, value]) => {
        if (value === '' || value === null || value === undefined) {
          newQuery[key] = undefined;
        } else {
          newQuery[key] = value.toString();
        }
      });

      router.replace({ query: newQuery }, undefined, { shallow: true });
    },
    [router]
  );

  return {
    getParam,
    setParam,
    clearParams,
    setMultipleParams,
    query: router.query,
  };
};
