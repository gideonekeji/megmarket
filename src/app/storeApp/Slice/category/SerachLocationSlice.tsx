import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: null as string | null, // Store state name as a string
  currentLocation: { lat: null, lng: null } as {
    lat: number | null;
    lng: number | null;
  }, // Store lat/lng as a plain object
};

const SerachLocationSlice = createSlice({
  name: "SerachLocationSlice",
  initialState,
  reducers: {
    setSearchLocationCategory: (state, action) => {
      state.selectedLocation = action.payload.name;
      state.currentLocation = {
        lat: action.payload.lat, // Store only lat/lng
        lng: action.payload.lng,
      };
    },
    clearSearchLocationCategory: (state) => {
      state.selectedLocation = null;
      state.currentLocation = { lat: null, lng: null };
    },
  },
});

export const { setSearchLocationCategory, clearSearchLocationCategory } =
  SerachLocationSlice.actions;

export default SerachLocationSlice.reducer;
