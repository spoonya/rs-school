import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
