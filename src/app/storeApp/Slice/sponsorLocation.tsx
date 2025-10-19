import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  latLng: { lat: null, lng: null },
};

const sponsorLocationSlice = createSlice({
  name: "sponsorLocation",
  initialState,
  reducers: {
    setSponsorLocation: (state, action) => {
      state.address = action.payload.address;
      state.latLng = action.payload.latLng;
    },
  },
});

export const { setSponsorLocation } = sponsorLocationSlice.actions;

export default sponsorLocationSlice.reducer;
