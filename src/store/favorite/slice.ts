import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteState {
  coinsIds: string[];
}

const initialState: FavoriteState = {
  coinsIds: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.coinsIds.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.coinsIds = state.coinsIds.filter((id) => id !== action.payload);
    },
    removeAllFavorites: (state) => {
      state.coinsIds = [];
    },
  },
});

export const { addFavorite, removeFavorite, removeAllFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
