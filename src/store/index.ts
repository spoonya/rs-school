import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { api } from '@/services/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { favoriteSlice } from './favorite/slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    favorite: favoriteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
