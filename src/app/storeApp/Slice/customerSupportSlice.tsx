import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the customer support response
export interface AddCustomerSupportRes {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Define the initial state for the slice
interface CustomerSupportState {
  supportRequest: AddCustomerSupportRes | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerSupportState = {
  supportRequest: null,
  loading: false,
  error: null,
};

// Create the slice
const customerSupportSlice = createSlice({
  name: "customerSupport",
  initialState,
  reducers: {
    // Action to start the support request (set loading to true)
    startSupportRequest(state) {
      state.loading = true;
      state.error = null;
    },

    // Action to handle a successful support request
    addSupportRequestSuccess(
      state,
      action: PayloadAction<AddCustomerSupportRes>
    ) {
      state.loading = false;
      state.supportRequest = action.payload;
    },

    // Action to handle a failed support request
    addSupportRequestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  startSupportRequest,
  addSupportRequestSuccess,
  addSupportRequestFailure,
} = customerSupportSlice.actions;

export default customerSupportSlice.reducer;
