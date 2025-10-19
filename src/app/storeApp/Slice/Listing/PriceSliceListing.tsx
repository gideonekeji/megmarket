import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface PriceStateListing {
  price: number;
}

const initialState: PriceStateListing = {
  price: 0, // Start with default value
};

const PriceSliceListing = createSlice({
  name: "priceListing",
  initialState,
  reducers: {
    // Update the price
    setPriceListing: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    // Reset the price
    clearPriceListing: (state) => {
      state.price = 0;
    },
  },
});

export const { setPriceListing, clearPriceListing } = PriceSliceListing.actions;
export default PriceSliceListing.reducer;
