import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  uploadedFiles: [],
  serviceName: "",
  numOfEmployees: "Less than 10",
  categoryId: null,
  subcategoryId: null,
  month: null,
  year: null,
};

const FirstStepFormValues = createSlice({
  name: "firstStepFormValues",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setUploadedFiles: (state, action) => {
      state.uploadedFiles = action.payload;
    },
    setServiceName: (state, action) => {
      state.serviceName = action.payload;
    },
    setNumOfEmployees: (state, action) => {
      state.numOfEmployees = action.payload;
    },
    setCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subcategoryId = action.payload;
    },
    setMonthYear: (state, action) => {
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
  },
});

export const {
  setAddress,
  setUploadedFiles,
  setServiceName,
  setNumOfEmployees,
  setCategory,
  setSubCategory,
  setMonthYear,
} = FirstStepFormValues.actions;

export default FirstStepFormValues.reducer;
