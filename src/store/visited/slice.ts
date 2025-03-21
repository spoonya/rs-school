import { VISITED_KEY } from '@/services';
import { Country } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface VisitedState {
  countries: Country[];
}

const initialState: VisitedState = {
  countries: JSON.parse(localStorage.getItem(VISITED_KEY) ?? '[]'),
};

export const visitedSlice = createSlice({
  name: 'visited',
  initialState,
  reducers: {
    addVisited: (state, action: PayloadAction<Country>) => {
      if (!state.countries.some((c) => c.cca2 === action.payload.cca2)) {
        state.countries.push(action.payload);
        localStorage.setItem(VISITED_KEY, JSON.stringify(state.countries));
      }
    },
    removeVisited: (state, action: PayloadAction<Country['cca2']>) => {
      state.countries = state.countries.filter((c) => c.cca2 !== action.payload);
      localStorage.setItem(VISITED_KEY, JSON.stringify(state.countries));
    },
    removeAllVisited: (state) => {
      state.countries = [];
      localStorage.removeItem(VISITED_KEY);
    },
  },
});

export const { addVisited, removeVisited, removeAllVisited } = visitedSlice.actions;
export default visitedSlice.reducer;
