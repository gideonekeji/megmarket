// store/slices/categorySlice.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the selected category
interface CategoryState {
  selectedCategory: {
    id: number | null;
    category_name: string | null;
  };
}

const initialState: CategoryState = {
  selectedCategory: {
    id: sessionStorage.getItem("cid")
      ? Number(sessionStorage.getItem("cid"))
      : null,
    category_name: sessionStorage.getItem("category_name") || null,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    setSelectedCategory(
      state,
      action: PayloadAction<{ id: number; category_name: string }>
    ) {
      state.selectedCategory = {
        id: action.payload.id,
        category_name: action.payload.category_name,
      };
    },
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export const selectSelectedCategory = (state: { category: CategoryState }) =>
  state.category.selectedCategory;

export default categorySlice.reducer;
