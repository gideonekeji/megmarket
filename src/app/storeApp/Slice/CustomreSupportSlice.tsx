import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customerdata {
  name: string;
  email: string;
  price: string;
  phone: string;
  message: string;
}

// Define the initial state as an empty object
const initialState: Customerdata = {
  name: "",
  email: "",
  price: "",
  phone: "",
  message: "",
};

const CustomerSupportSlice = createSlice({
  name: "customerSupportSlice",
  initialState,
  reducers: {
    // Add an action to set the customer support message
    addCustomerSupportMessage(state, action: PayloadAction<Customerdata>) {
      // Overwrite the state with the new message
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.price = action.payload.price;
      state.phone = action.payload.phone;
      state.message = action.payload.message;
    },
  },
});

export const { addCustomerSupportMessage } = CustomerSupportSlice.actions;

export default CustomerSupportSlice.reducer;
