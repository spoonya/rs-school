import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { countrySlice } from './countries';
import { userSlice } from './users';

export const store = configureStore({
  reducer: {
    countries: countrySlice.reducer,
    users: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
