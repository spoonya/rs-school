import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { countryApi } from '@/services/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { visitedSlice } from './visited/slice';

export const store = configureStore({
  reducer: {
    [countryApi.reducerPath]: countryApi.reducer,
    visited: visitedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(countryApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
