import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setFirstStep: {
    submitForm: false,
  },
};

const FirstStep = createSlice({
  name: "firstStep",
  initialState,
  reducers: {
    setsetFirstStep: (state, action) => {
      state.setFirstStep = action.payload;
    },
  },
});

export const { setsetFirstStep } = FirstStep.actions;

export default FirstStep.reducer;
