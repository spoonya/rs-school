import { FAVORITES_KEY } from '@/services';
import { Coin } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  coins: Coin[];
}

const initialState: FavoritesState = {
  coins: JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]'),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Coin>) => {
      state.coins.push(action.payload);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.coins));
    },
    removeFavorite: (state, action: PayloadAction<Coin['id']>) => {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.coins));
    },
    removeAllFavorites: (state) => {
      state.coins = [];
      localStorage.removeItem(FAVORITES_KEY);
    },
  },
});

export const { addFavorite, removeFavorite, removeAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
