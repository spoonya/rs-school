import { CoinCategories, DEFAULT_CATEGORY } from '@/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CoinCategoriesState {
  activeCategory: CoinCategories;
}

const initialState: CoinCategoriesState = {
  activeCategory: DEFAULT_CATEGORY,
};

export const coinCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<CoinCategories>) => {
      state.activeCategory = action.payload;
    },
    resetActiveCategory: (state) => {
      state.activeCategory = DEFAULT_CATEGORY;
    },
  },
});

export const { setActiveCategory } = coinCategoriesSlice.actions;
export default coinCategoriesSlice.reducer;
