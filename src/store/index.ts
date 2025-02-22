import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { coinsApi } from '@/services/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { coinCategoriesSlice } from './coinCategories/slice';
import { favoritesSlice } from './favorites/slice';

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    favorites: favoritesSlice.reducer,
    coinCategories: coinCategoriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
