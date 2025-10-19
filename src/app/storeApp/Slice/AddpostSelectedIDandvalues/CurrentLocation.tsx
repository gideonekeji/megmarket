import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: null,
  longitude: null,
  locationName: "",
  cityImage: "", // ✅ Added field for image URL
  errorMessage: "",
};

const CurrentLocationSlice = createSlice({
  name: "CurrentLocationSlice",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.locationName = action.payload.locationName;
      state.cityImage = action.payload.cityImage || state.cityImage; // ✅ Store image if provided
      state.errorMessage = "";
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    setCityImage: (state, action) => {
      state.cityImage = action.payload; // ✅ Separate action if you just want to set the image
    },
  },
});

export const { setCurrentLocation, setError, setCityImage } =
  CurrentLocationSlice.actions;

export default CurrentLocationSlice.reducer;
