import { Coin } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteState {
  coins: Coin[];
}

const initialState: FavoriteState = {
  coins: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Coin>) => {
      state.coins.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Coin['id']>) => {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
    },
    removeAllFavorites: (state) => {
      state.coins = [];
    },
  },
});

export const { addFavorite, removeFavorite, removeAllFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
