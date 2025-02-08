import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryParamValue = string | number;

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key: string, defaultValue: QueryParamValue): QueryParamValue => {
      const value = searchParams.get(key);
      if (value === null) return defaultValue;

      if (typeof defaultValue === 'number') {
        return parseInt(value);
      }

      return value;
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key: string, value: QueryParamValue) => {
      setSearchParams((prev) => {
        prev.set(key, value.toString());
        return prev;
      });
    },
    [setSearchParams]
  );

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const setMultipleParams = useCallback(
    (params: Record<string, QueryParamValue>) => {
      const newParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value.toString());
      });
      setSearchParams(newParams, { replace: true });
    },
    [setSearchParams]
  );

  return {
    searchParams,
    getParam,
    setParam,
    clearParams,
    setMultipleParams,
  };
};
