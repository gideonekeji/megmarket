import { AddUserRegistrationRes } from "@/app/types/Restypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState: AddUserRegistrationRes = {
  first_name: "",
  email: "",
  password: "",
  last_name: "",
  new_mobile: "",
  username: "",
  role: "user",
  country_code: "",
  mobile: "",
};

// Create the slice
const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    // Action to set user registration details
    setUserRegistration: (
      state,
      action: PayloadAction<AddUserRegistrationRes>
    ) => {
      state.first_name = action.payload.first_name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.last_name = action.payload.last_name;
      state.new_mobile = action.payload.new_mobile;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.country_code = action.payload.country_code;
      state.mobile = action.payload.mobile;
    },
  },
});

// Export the actions and reducer
export const { setUserRegistration } = userRegistrationSlice.actions;
export default userRegistrationSlice.reducer;
