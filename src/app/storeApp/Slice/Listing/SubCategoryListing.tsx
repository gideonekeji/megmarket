import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubCategoryListing: {
    id: null,
    subcategory_name: "",
  },
};

const SubCategoryListing = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    setselectedSubCategoryListing: (state, action) => {
      state.selectedSubCategoryListing = action.payload;
    },
  },
});

export const { setselectedSubCategoryListing } = SubCategoryListing.actions;

export default SubCategoryListing.reducer;
