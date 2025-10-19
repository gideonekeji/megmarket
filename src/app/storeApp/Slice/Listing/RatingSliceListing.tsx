// src/redux/RatingSliceListing.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RatingStatelisting {
  selectedRating: string;
}

const initialState: RatingStatelisting = {
  selectedRating: "",
};

const RatingSliceListing = createSlice({
  name: "ratinglisting",
  initialState,
  reducers: {
    setSelectedRatingListing: (state, action: PayloadAction<string>) => {
      state.selectedRating = action.payload;
    },
    //  clear all state
    clearRatingListing: (state) => {
      state.selectedRating = "";
    },
  },
});

export const { setSelectedRatingListing , clearRatingListing } = RatingSliceListing.actions;

export default RatingSliceListing.reducer;
