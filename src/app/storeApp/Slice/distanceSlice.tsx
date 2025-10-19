import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  distance: 1, // initial value for distance (5 km)
};

const distanceSlice = createSlice({
  name: "distance",
  initialState,
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload; // set the new distance
    },
  },
});

export const { setDistance } = distanceSlice.actions;

export default distanceSlice.reducer;
