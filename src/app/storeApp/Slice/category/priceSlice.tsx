// store/slices/priceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface PriceState {
  price: number;
}

const initialState: PriceState = {
  price: 0, // Initial price value
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    // The action to update the price
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
  },
});

export const { setPrice } = priceSlice.actions;
export default priceSlice.reducer;
