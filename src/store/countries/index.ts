import { Country } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const fetchCountries = createAsyncThunk('countries/fetch', async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data
    .map((country: { name: { common: string }; cca2: string }) => ({
      code: country.cca2,
      name: country.name.common,
    }))
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
});

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch countries';
        state.loading = false;
      });
  },
});

export default countrySlice.reducer;
