import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCountries } from '@/store/countries';

export function useCountries() {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [countries, dispatch]);

  return countries;
}
