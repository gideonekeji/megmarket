import { RegisterWithMobailnumberRes } from "@/app/types/Restypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState: RegisterWithMobailnumberRes = {
  mobile: "",
  role: "user",
  country_code: "",
};

// Create the slice
const RegisterWithMobileNumberSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    // Action to set user registration details
    setUserRegistrationwithmobilenumber: (
      state,
      action: PayloadAction<RegisterWithMobailnumberRes>
    ) => {
      state.mobile = action.payload.mobile;
      state.role = action.payload.role;
      state.country_code = action.payload.country_code;
    },
  },
});

// Export the actions and reducer
export const { setUserRegistrationwithmobilenumber } =
  RegisterWithMobileNumberSlice.actions;
export default RegisterWithMobileNumberSlice.reducer;
