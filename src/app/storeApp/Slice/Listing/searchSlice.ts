// src/redux/slices/searchSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SearchState {
  query: string;
}

// Initial state
const initialState: SearchState = {
  query: "",
};

// Create a slice of the Redux store
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    //  clear  current state
    clearSearchQuery: (state) => {
      state.query = "";
    },
  },
});

// Export actions to update the state
export const { setSearchQuery  , clearSearchQuery} = searchSlice.actions;

// Export the reducer to be used in the store
export default searchSlice.reducer;
