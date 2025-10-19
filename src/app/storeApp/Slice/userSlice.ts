// userSlice.ts
import { User } from '@/app/types/Restypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selectedUser: User | null;
}

const initialState: UserState = {
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
