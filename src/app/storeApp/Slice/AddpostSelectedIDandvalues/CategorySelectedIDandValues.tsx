import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: {
    id: null,
    category_name: "",
  },
};

const CategorySelectedIDandValues = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } = CategorySelectedIDandValues.actions;

export default CategorySelectedIDandValues.reducer;
