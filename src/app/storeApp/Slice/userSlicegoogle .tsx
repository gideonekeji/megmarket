import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  userId: null,
  isAuthenticated: false,
  name: "",
};

const userSlicegoogle = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.name = action.payload.name;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.name = "";
    },
  },
});

export const { setUserInfo, setUserId, clearUserInfo } =
  userSlicegoogle.actions;

export default userSlicegoogle.reducer;
