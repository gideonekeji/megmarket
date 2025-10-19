import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  selectedPrice: 0, // or whatever default value you'd like
};

// Create the slice
const priceSlice = createSlice({
  name: 'pricesponcer',
  initialState,
  reducers: {
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setSelectedPrice } = priceSlice.actions;
export default priceSlice.reducer;
