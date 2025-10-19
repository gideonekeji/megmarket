"use client";
import { createSlice } from "@reduxjs/toolkit";

const id = sessionStorage.getItem("Category_ID");
const category_name = sessionStorage.getItem("Category_Name");

const initialState = {
  selectedCategoryListing: {
    id: id ? parseInt(id, 10) : null,
    category_name: category_name || "",
  },
};

const CategoryListingSlice = createSlice({
  name: "categoryListing",
  initialState,
  reducers: {
    setSelectedCategoryListing: (state, action) => {
      state.selectedCategoryListing = action.payload;
    },
  },
});

export const { setSelectedCategoryListing } = CategoryListingSlice.actions;

export default CategoryListingSlice.reducer;
