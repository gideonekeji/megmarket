import { ResetPasswordRes } from "@/app/types/Restypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState: ResetPasswordRes = {
  email: "",
  password: "",
  confirm_password: "",
};

// Create the slice
const resetPasswordSlice = createSlice({
  name: "resetPasswordSlice",
  initialState,
  reducers: {
    // Action to set user registration details
    setForgotpwd: (state, action: PayloadAction<ResetPasswordRes>) => {
      state.email = action.payload.email;
    },
  },
});

// Export the actions and reducer
export const { setForgotpwd } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
