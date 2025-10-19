import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the slice state
interface SearchState {
  query: string;
}

// Initial state
const initialState: SearchState = {
  query: "",
};

// Create the slice of the Redux store
const serviceDetailInputBoxSearch = createSlice({
  name: "serviceDetailInputBoxSearch",
  initialState,
  reducers: {
    setSearchQueryServiceDetail: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

// Export the action to update the state
export const { setSearchQueryServiceDetail } = serviceDetailInputBoxSearch.actions;

// Export the reducer to be used in the store
export default serviceDetailInputBoxSearch.reducer;
