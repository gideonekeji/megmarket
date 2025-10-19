// src/store/addressSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
  house: string;
  area: string;
  landmark: string;
  cityName: string;
}

const initialState: AddressState = {
  house: "",
  area: "",
  landmark: "",
  cityName: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AddressState>) => {
      state.house = action.payload.house;
      state.area = action.payload.area;
      state.landmark = action.payload.landmark;
      state.cityName = action.payload.cityName;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
