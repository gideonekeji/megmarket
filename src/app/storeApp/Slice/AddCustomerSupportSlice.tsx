import { AddCustomerSupportRes } from "@/app/types/Restypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface CustomerSupportState {
  customerSupportInfo: AddCustomerSupportRes | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerSupportState = {
  customerSupportInfo: null,
  loading: false,
  error: null,
};

// Create the slice
const customerSupportSlice = createSlice({
  name: "customerSupport",
  initialState,
  reducers: {
    // Start the request
    addCustomerSupportRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Success handler
    addCustomerSupportSuccess: (
      state,
      action: PayloadAction<AddCustomerSupportRes>
    ) => {
      state.customerSupportInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Error handler
    addCustomerSupportFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Clear the customer support data (optional)
    clearCustomerSupportInfo: (state) => {
      state.customerSupportInfo = null;
    },
  },
});

// Export the actions
export const {
  addCustomerSupportRequest,
  addCustomerSupportSuccess,
  addCustomerSupportFailure,
  clearCustomerSupportInfo,
} = customerSupportSlice.actions;

export default customerSupportSlice.reducer;
