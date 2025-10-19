import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubCategory: {
    id: null,
    subcategory_name: "",
  },
};

const SubCategorySelectedIdandValues = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    setselectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
     resetSubCategory: (state) => {
      state.selectedSubCategory = initialState.selectedSubCategory;
    },
  },
});

export const { setselectedSubCategory  ,resetSubCategory} =
  SubCategorySelectedIdandValues.actions;

export default SubCategorySelectedIdandValues.reducer;
