// redux/slices/serviceDetailScreenInputSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceDetailScreenInputState {
  searchQuery: string;
}

const initialState: ServiceDetailScreenInputState = {
  searchQuery: "",
};

const serviceDetailScreenInputSlice = createSlice({
  name: "serviceDetailScreenInput",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = serviceDetailScreenInputSlice.actions;
export default serviceDetailScreenInputSlice.reducer;
