import { CountriesResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints } from './constants';

export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://restcountries.com/v3.1',
  }),
  endpoints: (builder) => ({
    fetchCountries: builder.query<CountriesResponse, void>({
      query: () => ApiEndpoints.COUNTRIES_ALL_WITH_FIELDS,
    }),
  }),
});

export const { useFetchCountriesQuery } = countryApi;
