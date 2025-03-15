import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  country: string;
  agreement: boolean;
  picture: {
    base64: string;
    size: number;
    type: string;
  } | null;
  timestamp: number;
}

const initialState = {
  users: [] as User[],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'timestamp'>>) => {
      state.users.push({
        ...action.payload,
        timestamp: Date.now(),
      });
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
