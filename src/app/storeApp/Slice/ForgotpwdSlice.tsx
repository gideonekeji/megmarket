import { ResendotpandForgetpwdRes } from "@/app/types/Restypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState: ResendotpandForgetpwdRes = {
  email: "",
};

// Create the slice
const forgotpwdSlice = createSlice({
  name: "forgotpwdSlice",
  initialState,
  reducers: {
    // Action to set user registration details
    setForgotpwd: (state, action: PayloadAction<ResendotpandForgetpwdRes>) => {
      state.email = action.payload.email;
    },
  },
});

// Export the actions and reducer
export const { setForgotpwd } = forgotpwdSlice.actions;
export default forgotpwdSlice.reducer;
