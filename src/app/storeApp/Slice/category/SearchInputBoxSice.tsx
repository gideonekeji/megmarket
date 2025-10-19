// store/slices/SearchInputBoxSice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state and type
interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

const SearchInputBoxSice = createSlice({
  name: "searchInputBox",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = SearchInputBoxSice.actions;
export default SearchInputBoxSice.reducer;
