// src/redux/ratingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RatingState {
  selectedRating: string;
}

const initialState: RatingState = {
  selectedRating: ""
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setSelectedRating: (state, action: PayloadAction<string>) => {
      state.selectedRating = action.payload;
    },
  },
});

export const { setSelectedRating } = ratingSlice.actions;

export default ratingSlice.reducer;
