import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: "", // Location name
  currentLocation: "",  // Google location object as string
  lat: null,            // Latitude
  lng: null,            // Longitude
  image: null           // City image URL
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.selectedLocation = action.payload.name;
      state.currentLocation = JSON.stringify(action.payload.location);
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.image = action.payload.image || null; // store image
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
