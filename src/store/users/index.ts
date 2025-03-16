import { UserFormData } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  users: [] as UserFormData[],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<UserFormData, 'timestamp'>>) => {
      state.users.unshift({
        ...action.payload,
        timestamp: Date.now(),
      });
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
